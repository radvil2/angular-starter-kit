const passport = require('passport');

/**
 *	@Desc Check Authentication;
 *	Uses passport.js library to ease jwt verification,
 *	Doesn't use session.
 *
 *	##	Example:
 *
 *	router.put(checkAuth, updateUser);
 */
exports.checkAuth = passport.authenticate('jwt', { session: false });

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
		? res.status(401).json({ message: 'Unauthorized', success: false })
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
	// const token = req.headers['authorization']; // cut Bearer
	// return res.status(401).send('Access denied. No token provided!');
	// const decodedUser = jwt.verify(token, SECRET);
	return req.user._id != req.params.id
		? res.status(401).json({ message: 'Invalid Permission!' })
		: next();
};
