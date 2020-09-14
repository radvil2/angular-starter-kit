const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

//	#region ## userSchema
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: [255, 'Max 255 chars!']
	},
	username: {
		type: String,
		required: true,
		minlength: [3, 'Min 3 chars!'],
		maxlength: [255, 'Max 255 chars!'],
		unique: true,
		set: (v) => v.toLowerCase()
	},
	email: {
		type: String,
		required: true,
		minlength: [5, 'Min 5 chars!'],
		maxlength: [255, 'Max 255 chars!'],
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: [8, 'Min 8 chars!'],
		maxlength: [255, 'Too long! Not allowed!']
	},
	role: {
		type: String,
		enum: ['root', 'admin', 'user'],
		default: 'user'
	},
	photo: {
		type: String,
		maxlength: [255, 'Too long filename is not allowed!']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: Date,
	lastLogin: Date
});
// #endregion

//	#region ## User Schema methods
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);

		return next();
	} catch (error) {
		return next(error);
	}
});

userSchema.methods.validatePassword = async function (plainPassword) {
	return bcrypt.compare(plainPassword, this.password);
};
//	#endregion

exports.User = model('User', userSchema);
