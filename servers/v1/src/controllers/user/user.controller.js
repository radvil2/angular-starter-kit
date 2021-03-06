const { User } = require('../../models/user.model');
const { checkExist, replaceImage } = require('../../utils/helpers');
const MyQuerify = require('../../utils/MyQuerify');
const userSrv = require('./user.service');
const { setTokenCookie } = require('./user.service');
const jwt = require('jsonwebtoken');


//	#region !! User Controllers !!

/**
 *	@desc	Get all registered users
 *	@method GET
 *	@queries sort, select, paging, limit
 *	@route /users
 *	@roles root, admin
 *
 *	## Example Route:
 *
 *	/users?page=2&limit=1&sort=createdAt&field=username&value=test
 *
 *	@TODO ## Should we just delete the search route?
 */
exports.getUsers = async (req, res, next) => {
	const que = new MyQuerify(req.query);

	try {
		const doc = await User.find()
			.sort(que.sort())
			.select(que.select())
			.limit(que.limit())
			.skip(que.skip());

		if (!doc) return next(new Error('Failed!'));

		return res.json({ total: doc.length, doc });
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Search any users (public). Limit field (username, name, photo)
 *	@method GET
 *	@queries sort, select, limit, field, value
 *	@route /users/search
 *
 *	##	Example route:
 *
 *	/users/search?page=2&limit=1&sort=createdAt&select=username%20name%20email
 *
 */
exports.searchUsers = async (req, res, next) => {
	const que = new MyQuerify(req.query);

	try {
		const doc = await User.find(que.search())
			.sort(que.sort())
			.select('username name photo')
			.limit(que.limit())
			.skip(que.skip());

		if (!doc) return next(new Error('Failed!'));

		return res.json({ total: doc.length, doc });
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Get user by id (private)
 *	@method GET
 *	@param userId
 *	@route /users/:id
 *
 *	@TODO restrict permission from schema method!
 *
 */
exports.getUser = async (req, res, next) => {
	try {
		const doc = await User.findById(req.params.id);

		if (!doc) return next(new Error('User not found!'));

		return res.json(doc);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Get user profile (public)
 *	@method GET
 *	@param userUsername
 *	@route /users/profile/:username
 *
 *	This will not cover user's sensitive information
 *
 */
exports.getProfile = async (req, res, next) => {
	const username = req.params.username;

	try {
		const doc = await User.findOne({ username }).select(
			'-email -password -role '
		);

		if (!doc) return next(new Error('User not found!'));

		return res.json(doc);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Update Update user
 *	@method PUT
 *	@param userId
 *	@route /users/:id
 *
 *	Will reject update password in this route,
 *	since we will implement the separated route for the password update
 *
 */
exports.updateUser = async (req, res, next) => {
	const updatedAt = new Date().toISOString();

	if (req.body.password) return next('Not allowed!');

	let user = await User.findById(req.params.id).select('-password');
	if (!user) return next('No such user!');

	let photo = await replaceImage(user.photo, 'users', req);
	if (!photo) photo = user.photo;

	try {
		const result = await user.set({ ...req.body, photo, updatedAt }).save();

		if (!result) return next(new Error('Failed to apply new update!'));

		return res.json(result);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Delete user by id
 *	@method DELETE
 *	@param userId
 *	@route /users/:id
 *
 *	Will check if logged in user's ID is same as requested user's id
 *
 *	@TODO ## Check user validation by requiring the password
 *
 */
exports.deleteUser = async (req, res, next) => {
	try {
		const doc = await User.findByIdAndRemove(req.params.id);

		if (!doc) return next(new Error('User not found!'));

		return res.send('Delete user succeed!');
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Change user's password
 *	@method PATCH
 *	@param userId
 *	@route /users/updatePassword/:id
 *
 *	This will only accept update for password
 *	@TODO ## Check the old password for update validation
 *
 */
exports.updatePassword = async (req, res, next) => {
	const { oldPassword, password } = req.body;
	const updatedAt = new Date().toISOString();

	if (!password) return next('Password is required!');

	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.send('User not found!');

		const isMatch = await user.validatePassword(oldPassword);
		if (!isMatch) return res.send('Invalid password!');

		const result = await user.set({ password, updatedAt }).save();
		if (!result) return next(new Error('Failed to save new password!'));

		return res.json({
			message: 'Password updated!',
			lastUpdate: result.updatedAt
		});
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Register a new user
 *	@method POST
 *	@route /users/register
 *
 *	Check if the requested username and email has already been registered
 *
 */
exports.registerUser = async (req, res, next) => {
	let { username, email, photo } = req.body;

	await checkExist(User, 'username', username);
	await checkExist(User, 'email', email);

	try {
		/** @TODO Test passwords for regex and make a new function plus a new route to test the passwords */

		if (req.file) photo = req.file.filename;

		const doc = await new User({ ...req.body, photo }).save();
		if (!doc) return next('Failed to create new user!');

		return res.json({ doc });
	} catch (ex) {
		return ex.code == 11000
			? next('username or email already exist!')
			: next(ex.message);
	}
};

/**
 *	@desc Login (or) Authenticate user
 *	@method POST
 *	@route /users/login
 *
 *	After user successfully logged in, save the lastLogin information date.
 *	Set the payload to {user_id, username, role}, then sign them to jwt token with expiration max for 7days.
 *
 */
exports.loginUser = async (req, res, next) => {
	const { username, password } = req.body;

	try {

		const user = await User.findOne({ username });
		if (!user) return next('Invalid username or password!');

		const isMatch = await user.validatePassword(password);
		if (!isMatch) return next('Invalid username or password!');

		// generate payload, token, & refresh token
		const { token, payload } = await userSrv.genAccToken(user);
		const { token: refToken } = await userSrv.genRefToken(user, req.ip);

		user.set({ lastLogin: new Date(Date.now()) });

		await user.save();
		await userSrv.setTokenCookie(res, refToken); // this is it!!

		const result = { ...payload, token };

		// return user payload along with the token
		return res.json({ message: 'Login succeed', doc: result });

	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Request new refresh tokens (accessTokens & refreshTokens)
 *	@method POST
 *	@route /users/refresh-token
 *
 *	Get token from cookies header and client ip address
 *	request new tokens
 *	Rest cookies header with new tokens
 *	Send back user detail along with new access token as the final response
 *
 */
exports.requestNewTokens = async (req, res) => {
	const ipAddress = req.ip;
	const oldRefToken = req.cookies.refreshToken;

	if (!oldRefToken) {
		return res.status(403).send('Forbidden access!');
	}

	try {
		const { refreshToken, ...payload } = await userSrv.refreshTokens({
			oldRefToken,
			ipAddress
		});

		await setTokenCookie(res, refreshToken);

		res.json({ message: 'Token refreshed!', doc: payload });
	} catch (error) {
		// const message = (error && error.message) || error;
		// return res.status(403).send(message);
		return next('failed at controller')
	}
}

/**
 *	@desc DecodeToken to serialize user
 *	@method GET
 *	@route /users/decode-token
 *	@param userId
 *
 *	Get token from Authorization header
 *	Decode token with jsonwebtoken
 *	Get user detail by looking on db collection by querying id
 *	Send back user detail as final response
 *
 */
exports.requestPrivateUser = async (req, res, next) => {
	// return console.log('request-user', req.user);

	try {
		const requestedUser = await User
			.findById(req.user._id)
			.select('-__v -password');

		if (!requestedUser) return res.status(401).send('Failed to fetch user !!');

		return res.json({ message: 'Private user requested', doc: requestedUser });
	} catch (error) {
		console.log('request-private-error', error);
		return res.status(401).send('request user failed', error);
	}
};

//	#endregion ## User Controllers ##
