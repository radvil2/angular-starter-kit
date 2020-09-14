const jwt = require('jsonwebtoken');
const db = require('../configs/db.config');
const { secret } = require('../configs/env.config');

/**
 * @param can be a single role (e.g. Role.User or 'User') 
 * @param or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
 * 
*/
module.exports.authorize = (roles = []) => {
    if (typeof roles === 'string') roles = [roles];

    return [verifyToken(), authorizeAccess(roles)];
}

// token verification
function verifyToken() {

    return async (req, res, next) => {
        try {
            const authHeader = req.headers['Authorization'] || req.get('Authorization');

            if (!authHeader) {
                return res.status(401).json({ message: 'No token provided!' });
            }

            const verifiedUser = jwt.verify(authHeader, secret);

            // req.user = verifiedUser || jwt.decode(authHeader);
            req.user = verifiedUser || await db.User.findById(req.user.id);

            next();

        } catch (error) {
            const errorMessage = (error instanceof jwt.JsonWebTokenError)
                ? new jwt.TokenExpiredError('Token has been expired').message
                : error.message;
            return res.status(401).send(errorMessage);
        }
    }
}

// user's role authorization
function authorizeAccess(roles) {

    return async (req, res, next) => {
        try {

            // if user no longer exists or role(s) is not authorized
            if (!req.user || (roles.length && !roles.includes(req.user.role))) {
                return res.status(403).json({ message: 'Unauthorized access' });
            }

            // authentication and authorization successful
            const refreshTokens = await db.RefToken.find({ user: req.user.id });

            if (!refreshTokens) {
                return res.status(403).json({ message: 'Refresh tokens are empty' })
            }

            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);

            next();

        } catch (error) {
            return res.status(403).json(error.message)
        }
    }
}