const { User } = require('../models/user.model');
const { SECRET } = require('../configs');
const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET
};

/**
 *	@Desc	Defining passport strategy.
 *	Set the Authorization header to use in every restricted routes before pass it to the routes
 *
 */
module.exports = (passport) => {
	passport.use(
		new Strategy(opts, (payload, done) => {
			User.findById(payload.user_id) // This payload was sent by controller
				.then((user) => {
					if (user) return done(null, user);
					return done(null, false);
				})
				.catch((err) => {
					return done(null, false);
				});
		})
	);
};
