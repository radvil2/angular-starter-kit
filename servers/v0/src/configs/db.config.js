const env = require('./env.config.js');
const mongoose = require('mongoose');

mongoose.connect(env.mongoUri, env.mongoOptions, (err) => {
	err
		? console.log('[ ERR ] Mongo Error =>', err)
		: console.log('[ OK ] Mongo Connection => ', env.mongoUri);
});

mongoose.Promise = global.Promise;

module.exports = {
	User: require('../models/user.model'),
	RefToken: require('../models/ref-token.model'),
	isValidId
};

function isValidId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}