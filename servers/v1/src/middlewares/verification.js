const jwt = require('jsonwebtoken');
const { SECRET } = require('../configs');

/**
 *	@Desc Check Authentication;
 *	Uses passport.js library to ease jwt verification,
 *	Doesn't use session.
 *
 *	##	Example:
 *
 *	router.put(checkAuth, updateUser);
 */
exports.checkAuth = async (req, res, next) => {

	const token = req.headers['authorization']
		|| req.get('Authorization');
	// console.log(token);

	if (!token) {
		return res.status(401);
	}

	try {
		const user = await verifyToken(token);
		// return console.log(user);
		if (!user) return res.status(401);
		// Not querying the database for performance,
		// instead just attached the payload to the req.user
		req.user = { ...user };

		next();

	} catch (error) {
		return res.status(401).send(error);
	}
}

const verifyToken = (token) => new Promise((resolve, reject) => {
	if (!token.startsWith('Bearer')) {
		return reject();
	}

	token = token.substring(7);

	jwt.verify(token, SECRET, (err, payload) => {
		if (err) {
			return reject();
		}

		if (!payload || !payload.username) {
			return reject();
		}

		resolve(payload);
	})
})


/**
 *	@Desc Check current logged in user's role(s);
 *	Each user may have multiple roles with different permission.
 *
 *	##	Example:
 *
 *	router.delete(checkRole(['user', 'admin']), deleteBlog);
 */
exports.checkRole = (roles) => (req, res, next) => {
	!roles.includes(req.user.role)
		? res.status(401).json({ message: 'Role Unauthorized!', success: false })
		: next();
};

/**
 *	@Desc Verify request actions,
 *
 *	##	Example:
 *
 *	router.route('users/:id').get(verifyUser, getUser)
 *
 *	This only applied to users route explicitly
 */
exports.verifyUser = (req, res, next) => {
	return req.user._id != req.params.id
		? res.status(400).json({ message: 'Invalid Permission!' })
		: next();
};
