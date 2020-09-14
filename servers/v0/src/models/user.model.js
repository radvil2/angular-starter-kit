const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

//	#region ## userSchema
const schema = new Schema({
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
		enum: ['admin', 'user'],
		default: 'user'
	},
	photo: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: Date,
	loggedInAt: Date,
	gender: {
		type: String,
		enum: ['male', 'female'],
	},
	birthday: Date,
	coverPicture: String,
	company: String,
	job: String,
	followers: [String],
    privates: [String],
});
// #endregion

schema.virtual('totalFollowers').get(function () {
	return this.followers.length;
});

schema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		// remove these props when object is serialized
		delete ret._id;
		delete ret.followers;
		delete ret.password;
	}
});

schema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);

		return next();
	} catch (error) {
		return next(error);
	}
});

schema.methods.validatePassword = function (plainPassword) {
	return new Promise((resolve, reject) => {
		return bcrypt.compare(plainPassword, this.password, (err, success) => {
			if (err) return reject(err);

			return resolve(success)
		})
	})
};

module.exports = model('User', schema);
