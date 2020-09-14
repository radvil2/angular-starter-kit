const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../configs/db.config');
const { secret } = require('../configs/env.config');

module.exports = {
	generateAccToken,
	generateRefToken,
	randomCrypto,
	serialize,
	setTokenCookie
};

// Create a jwt token containing the user id that expires in 15 minutes
function generateAccToken(user) {
	const payload = {
		id: user.id,
		username: user.username,
		role: user.role
	};

	return new Promise((resolve, reject) => {
		return jwt.sign(payload, secret, { expiresIn: '2days' }, (err, token) => {
			err ? reject() : resolve(token);
		});
	});
}

// Create a refresh token that expires in 7 days
function generateRefToken(user, ipAddress) {
	const newDoc = new db.RefToken({
		user: user.id,
		token: randomCrypto(),
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		created: {
			ip: ipAddress
		}
	});

	return new Promise((resolve, reject) => {
		newDoc.save((err, token) => (err ? reject(err) : resolve(token)));
	});
}

// create http only cookie with refresh token
//  that expires in 7 days
function setTokenCookie (res, refToken) {
	const options = {
		httpOnly: true,
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	};
	return res.cookie('refreshToken', refToken, options);
}

// Create random token string with crypto
function randomCrypto() {
	return crypto.randomBytes(40).toString('hex');
}
// Serialize detail before send as JSON
function serialize(doc) {
	const { 
		id,
		name,
		email,
		username,
		role
	} = doc;

	return { id, name, email, username, role };
}
