const db = require('../../configs/db.config');
const {
	serialize,
	generateAccToken,
	generateRefToken
} = require('../../utils/helpers');
const MakeQuery = require('../../utils/MakeQuery');

exports.authenticate = async ({ username, password, ipAddress }) => {
	const user = await db.User.findOne({ username });

	if (!user || !await user.validatePassword(password)) {
		throw 'Invalid username or password';
	}

	// Authentication successful
	try {
		const accToken = await generateAccToken(user);
		const refreshToken = await generateRefToken(user, ipAddress);

		if (!accToken || !refreshToken) {
			throw 'Fail to generate tokens'
		}

		user.set({ lastLogin: Date.now() })

		return {
			...serialize(user),
			token: accToken,
			refreshToken: refreshToken.token
		};
	} catch (error) {
		throw error
	}
};

exports.refreshToken = async ({ token, ipAddress }) => {
	try {
		const refToken = await getRefreshToken(token);
		const { user } = refToken;

		// replace old refresh token with a new one and save
		const newRefToken = await generateRefToken(user, ipAddress);
		if (!newRefToken) throw 'Failed to generate new refresh token'

		refToken.revoked.date = Date.now();
		refToken.revoked.ip = ipAddress;
		refToken.replaceToken = newRefToken.token;

		await refToken.save();

		// generate new jwt for accessToken
		const accessToken = await generateAccToken(user);
		if (!accessToken) throw 'Failed to generate new access token'

		// return basic details and tokens
		return {
			...serialize(user),
			token: accessToken,
			refToken: newRefToken.token
		};
	} catch (error) {
		throw error
	}
}

exports.getRefreshTokens = async (userId) => {
	try {
		if (!db.isValidId(userId)) throw 'User not found';

		const user = await db.User.findById(userId);
		if (!user) throw 'User not found';

		// return refresh tokens for user
		const refTokens = await db.RefToken.find({ user: userId });

		return refTokens;

	} catch (error) {
		throw error
	}
}

async function getRefreshToken(token) {
	const refToken = await db.RefToken.findOne({ token }).populate('user');
	if (!refToken || !refToken.isActive) throw 'Invalid token';

	return refToken;
}

exports.revokeToken = async ({ token, ipAddress }) => {
	try {
		const refToken = await getRefreshToken(token);

		// revoke token and save
		refToken.revoked.date = Date.now();
		refToken.revoked.ip = ipAddress;

		await refToken.save();

	} catch (error) {
		throw error
	}
}

exports.revokeAllTokens = async ({ userId, ipAddress }) => {
	try {
		if (!db.isValidId(userId)) throw 'User not found';

		const user = await db.User.findById(userId);
		if (!user) throw 'User not found';

		// return refresh tokens for user
		// TODO: Later query ipAddress
		await db.RefToken.deleteMany({ user: userId });

	} catch (error) {
		throw error
	}
}

exports.register = async ({ name, username, email, password }) => {

	const newUser = new db.User({
		name,
		username,
		email,
		password,
		updatedAt: Date.now()
	});

	const savedUser = await newUser.save();

	if (!savedUser) throw 'Failed to register';

	return serialize(savedUser);
}

exports.updatePassword = async (userId, { oldPassword, newPassword }) => {

	const user = await db.User.findById(userId);
	if (!user) throw 'User not found';

	// Compare password against database
	const isValid = await user.validatePassword(oldPassword);
	if (!isValid) throw 'Invalid password';

	try {

		user.set({
			password: newPassword,
			updatedAt: Date.now()
		})

		const updated = await user.save();

		return serialize(updated);

	} catch (error) {
		throw error
	}
}

// Private user request
exports.getById = async (id) => {
	if (!db.isValidId(id)) throw 'User not found';

	const user = await db.User.findById(id);

	if (!user) throw 'User not found';

	return user;
}

// Public user request
exports.getPublicProfile = async (id) => {
	try {
		const unless = await setExceptionFields(id);

		const user = await db.User.findById(id).select(unless);
		if (!user) throw 'Failed to fetch user';

		//=====

		// const result = {};
		// const userKeys = Object.keys(user['_doc'])
		// 	.filter(k => !user['privates'].includes(k))
		// 	.forEach(k => result[k] = user[k])

		// console.log(userKeys, result);

		// // Dont save;
		// return serializePublic(result);

		// ====

		return user;


	} catch (error) {
		throw error
	}
}

// Set public key
exports.setPublicKey = async (userId, key) => {
	try {

		const doc = await db.User.findById(userId);
		if (!doc) throw 'Failed to fetch fields';

		while(doc['privates'].includes(key)) {
			doc['privates'].splice(doc['privates'].indexOf(key, 1));
		}

		doc.privates.push(key);

		const savedUser = await doc.save();
		if (!savedUser) throw 'Failed to set';

		return savedUser['privates'];

	} catch (error) {
		throw error;
	}
}

async function setExceptionFields(userId) {
	const user = await db.User.findById(userId).select('privates');
	if (!user) throw 'Failed to fetch user';

	const fields = user['privates'].join(' -');
	return '-__v -privates -' + fields;
}

exports.getAll = async (req) => {
	const makeQuery = Object.create(MakeQuery);
	makeQuery.init(req.query);

	const users = await db.User.find()
		.sort(makeQuery.sort())
		.select(makeQuery.select())
		.limit(makeQuery.limit())
		.skip(makeQuery.skip());

	if (!users) throw 'Failed to get all users';

	return users.map(user => serialize(user));
}
