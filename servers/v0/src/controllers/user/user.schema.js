const joi = require('joi');
const validate = require('../../middlewares/validate-request');

module.exports = {
	loginSchema(req, res, next) {
		const schema = joi.object({
			username: joi.string().required(),
			password: joi.string().required()
		});
		validate(req, next, schema);
	},

	registerSchema(req, res, next) {
		const schema = joi.object({
			name: joi.string().required(),
			username: joi.string().required(),
			email: joi.string().required(),
			password: joi.string().required(),
		});
		validate(req, next, schema);
	},

	updatePasswordSchema(req, res, next) {
		const schema = joi.object({
			oldPassword: joi.string().required(),
			newPassword: joi.string().required()
		});
		validate(req, next, schema);
	},

	revokeTokenSchema(req, res, next) {
		const schema = joi.object({
			token: joi.string().empty('')
		});
		validate(req, next, schema);
	}
};
