const { Schema, model } = require('mongoose');
const { slugIt, slugDate } = require('../utils/helpers');

// #region blogSchema
const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255
		},
		content: {
			type: String,
			required: true,
			minlength: 5
		},
		category: {
			type: Schema.ObjectId,
			ref: 'Cat',
			maxlength: 24 // based mongo id length.
		},
		tags: [String],
		author: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
			immutable: true,
			minlength: 20,
			maxlength: 24
		},
		slug: {
			type: String,
			lowercase: true,
			unique: true,
			minlength: 5,
			maxlength: 510
		},
		likedBy: [String],
		likes: {
			type: Number,
			default: 0
		},
		isPublished: {
			type: Boolean,
			default: false
		},
		image: {
			type: String, // note this save only filename;
			maxlength: 255
		},
		images: [
			{
				type: String,
				maxlength: 255
			}
		]
	},
	{ timestamps: true }
);
// #endregion

// #region categorySchema
const catSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 255
		},
		slug: {
			type: String,
			unique: true,
			maxlength: 255
		},
		detail: {
			type: String,
			maxlength: 1000
		},
		image: {
			type: String, // note: should save only filename;
			trim: true,
			maxlength: 255
		},
		author: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
			immutable: true,
			minlength: 20,
			maxlength: 24
		}
	},
	{ timestamps: true }
);
// #endregion

// #region commentSchema
const commentSchema = new Schema(
	{
		discussion: {
			type: Schema.ObjectId,
			ref: 'Blog',
			maxlength: 255,
			required: true,
			immutable: true
		},
		parent: {
			type: String,
			default: null,
			maxlength: 255,
			immutable: true
		},
		slug: {
			type: String,
			maxlength: 255,
			required: true
		},
		// fullSlug: { // if parent !null ??
		// 	type: String,
		// 	maxlength: 500
		// },
		text: {
			type: String,
			maxlength: 1000
		},
		image: {
			type: String,
			maxlength: 255
		},
		author: {
			type: Schema.ObjectId,
			ref: 'User',
			maxlength: 24,
			required: true,
			immutable: true
		},
		likedBy: [String],
		likes: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);
// #endregion

// #region !! custom schemas methods !!

/**
 * @Desc Make slug before save to doc
 * Note that in order to succeed, set slug required to false;
 *
 * @param blog title
 *
 */
blogSchema.pre('save', async function (next) {
	// if user doesnt change the title.
	if (!this.isModified('title')) return next();

	try {
		this.slug = await slugIt(this.title);

		return next();
	} catch (ex) {
		return next(ex.message);
	}
});

/**
 * @Desc Verify the true author of the doc, before doing some actions.
 *
 * @param requestedUserId
 *
 * ## Example
 *
 * 		const blog = await Blog.findById(req.params.id);
 * 		const isAuthor = await blog.verifyAuthor(req.user._id)
 *
 */
blogSchema.methods.verifyAuthor = async function (requestedUserId) {
	return requestedUserId.toString() === this.author.toString() ? true : false;
};

/**
 * @Desc Make slug before save to doc
 * Note that in order to be success, set slug required to false.
 *
 * @param category name
 *
 */
catSchema.pre('save', async function (next) {
	// if user doesnt change the name.
	if (!this.isModified('name')) return next();

	try {
		this.slug = await slugIt(this.name);

		return next();
	} catch (ex) {
		return next(ex.message);
	}
});

/**
 * @Desc Verify the true author of the doc, before doing some actions.
 *
 * @param requestedUserId
 *
 * ## Example
 *
 * 		const cat = await Vat.findById(req.params.id);
 * 		const isAuthor = await cat.verifyAuthor(req.user._id)
 *
 */
catSchema.methods.verifyAuthor = async function (requestedUserId) {
	return blogSchema.methods.verifyAuthor.call(this, requestedUserId);
};

/**
 * @Desc Slugify comment
 * Note that in order to be success, set slug required to false.
 *
 * @param new Date Time
 *
 */
commentSchema.pre('save', async function (next) {
	if (!this.isModified('text')) return next();
	
	try {
		this.slug = await slugDate();

		return next();
	} catch (ex) {
		return next(ex.message);
	}
});

/**
 * @Desc Verify the true author of the doc, before doing some actions.
 *
 * @param requestedUserId
 *
 * ## Example
 *
 * 		const cat = await Vat.findById(req.params.id);
 * 		const isAuthor = await cat.verifyAuthor(req.user._id)
 *
 */
commentSchema.methods.verifyAuthor = async function (requestedUserId) {
	return blogSchema.methods.verifyAuthor.call(this, requestedUserId);
};

// #endregion ## custom schemas methods ##

exports.Blog = model('Blog', blogSchema);
exports.Cat = model('Cat', catSchema);
exports.Comment = model('Comment', commentSchema);
