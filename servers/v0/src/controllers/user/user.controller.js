const userService = require('./user.service');
const { setTokenCookie } = require('../../utils/helpers');
const Role = require('../../configs/role.config');

/**
 *	@desc Login (or) Authenticate user
 *	@method POST
 *	@route /users/login
 *
 *	After user successfully logged in, save the lastLogin information date.
 *	Set the payload to {user_id, username, role}, then sign them to jwt token with expiration max for 7days.
 *	Set refreshToken to the cookie http-only
 *
 */
exports.AUTHENTICATE = (req, res, next) => {
	const { username, password } = req.body;
	const ipAddress = req.ip;

	userService.authenticate({ username, password, ipAddress })
		.then(({ token, refreshToken, ...user }) => {
			setTokenCookie(res, refreshToken);
			res.json({ doc: { ...user, token } });
		})
		.catch(next);
};

/**
 *	@desc Refresh users's tokens
 *	@method GET
 *	@route /users/refresh-token
 *
 *	Request old refresh token from req.cookies
 *	Generate new accessToken & new refreshToken by verifying the oldToken
 *	Set a new refreshToken to the cookie http-only
 *	Send a new accessToken along with the user's payload as a success response
 *
 */
exports.REFRESH_TOKEN = (req, res, next) => {
	const token = req.cookies.refreshToken;
	const ipAddress = req.ip;

	userService.refreshToken({ token, ipAddress })
		.then(({ refToken, ...doc }) => {
			setTokenCookie(res, refToken);
			res.json({ doc });
		})
		.catch(next);
}

/**
 *	@desc Revoke users's tokens
 *	@method GET
 *	@route /users/refresh-token
 * 
 *	Users can revoke their own tokens and admins can get any user's tokens
 * @@TODO find out if this meant to be a logout action !!
 *
 */
exports.REVOKE_TOKEN = async (req, res, next) => {

	const token = req.body.token || req.cookies.refreshToken;
	const ipAddress = req.ip;

	if (!token) {
		return res.status(400).json({ message: 'Token is required' });
	}

	if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	userService.revokeToken({ token, ipAddress })
		.then(() => res.json({ message: 'Token has been revoked' }))
		.catch(next);
}

/**
 *	@desc Revoke all user's token
 *	@method GET
 *	@route /users/:id/revoke-tokens
 * 
 *	Users can revoke their own tokens and admins can get any user's tokens
 * Logout user's account from all devices
 *
 */
exports.REVOKE_ALL_TOKENS = async (req, res, next) => {

	if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (!req.user.ownsToken(req.cookies.refreshToken)) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	userService.revokeAllTokens({ userId: req.user.id, ipAddress: req.ip })
		.then(() => res.json({ message: 'All Tokens revoked' }))
		.catch(next);
}

/**
 *	@desc GET All User's refresh tokens
 *	@method GET
 *	@route /users/refresh-token
 *
 *	Users can get their own refresh tokens and admins can get any user's refresh tokens
 *
 */
exports.GET_REFRESH_TOKENS = async (req, res, next) => {

	if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	userService.getRefreshTokens(req.params.id)
		.then(tokens => tokens ? res.json({ doc: tokens }) : res.sendStatus(404))
		.catch(next);
}

/**
 *	@desc	Register a new user
 *	@method POST
 *	@route /users/register
 *
 *	Check if the requested username and email has already been registered
 *
 */
exports.REGISTER = (req, res, next) => {
	const { name, username, email, password } = req.body;

	userService.register({ name, username, email, password })
		.then(doc => res.json({ doc }))
		.catch(err => console.log(err));
};

/**
 *	@desc Request user private profile
 *	@method GET
 *	@route /users/private-profile
 *	@param userAccToken
 *	@roles any
 *
 * 	Each user can only request their own profile
 *
 */
exports.REQUEST_PRIVATE_PROFILE = (req, res, next) => {

	userService.getById(req.user.id)
		.then(user => user ? res.json({ doc: user }) : res.sendStatus(404))
		.catch(next);
}

exports.REQUEST_PUBLIC_PROFILE = (req, res, next) => {

	userService.getPublicProfile(req.params.id)
		.then(user => user ? res.json({ doc: user }) : res.sendStatus(404))
		.catch(next)
}

exports.SET_PUBLIC_KEY = (req, res, next) => {

	userService.setPublicKey(req.params.id, req.body.key)
		.then(key => res.json({ doc: key }))
		.catch(next)
}

/**
 *	@desc Request new password (Update Password)
 *	@method POST
 *	@route /users/:id/update-password/
 *	@param userId
 *	@roles any
 *
 * 	Each regular user can only make update password request
 * Admins are able to change any regular user request
 *
 */
exports.UPDATE_USER_PASSWORD = (req, res, next) => {

	if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(403).json({ message: 'Unauthorized' });
	}

	const { oldPassword, newPassword } = req.body;

	userService.updatePassword(req.params.id, { oldPassword, newPassword })
		.then(doc => res.json({ doc }))
		.catch(next);
}

/**
 *	@desc Get selected user's detail
 *	@method GET
 *	@route /users/:id
 *	@param userAccToken
 *	@roles user (only self access) || admin
 *
 * 	Regular users can get their own record and admins can get any record
 *
 */
exports.GET_USER = (req, res, next) => {

	if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(403).json({ message: 'Unauthorized' });
	}

	userService.getById(req.params.id)
		.then(user => user ? res.json({ doc: user }) : res.sendStatus(404))
		.catch(next);
};

/**
 *	@desc	Get all registered users
 *	@method GET
 *	@queries sort, select, paging, limit
 *	@route /users
 *	@roles admin
 *
 *	## Example Route:
 *
 *	/users?page=2&limit=1&sort=createdAt&field=username&value=test
 */
exports.GET_USERS = (req, res, next) => {
	userService.getAll(req)
		.then(users => res.json({ doc: users }))
		.catch(next);
}

