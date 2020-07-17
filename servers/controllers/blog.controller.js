const { Blog, Cat, Comment } = require('../models/blog.model');
const MyQuerify = require('../utils/MyQuerify');
const {
	replaceImage,
	deleteImage,
	addLike,
	removeLike
} = require('../utils/helpers');

//	#region !! Blog Controllers !!
/**
 *	@desc	To Get all blogs.
 *	@method GET
 *	@queries sort, select, paging, limit, field, value
 *	@route /blogs
 *
 *	## Example Route:
 *
 *	/blogs?page=2&limit=1&sort=createdAt&field=title&value=test
 *
 */
exports.getBlogs = async (req, res, next) => {
	const que = new MyQuerify(req.query);

	try {
		const blogs = await Blog.find(que.search())
			.populate({ path: 'author', select: 'name username photo' })
			.populate({ path: 'category', select: 'name slug' })
			.sort(que.sort())
			.select(que.select())
			.limit(que.limit())
			.skip(que.skip());

		return res.json({ total: blogs.length, doc: blogs });
	} catch (x) {
		return next(x.message);
	}
};

/**
 *	@desc	To GET blog by id (unfiltered)
 *	@method GET
 *	@param blogId
 *	@route /blogs/:id
 *
 */
exports.getBlog = async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id)
			.populate({ path: 'author', select: 'name username photo' })
			.populate({ path: 'category', select: 'name slug' });

		if (!blog) return next('No such blog!');

		return res.json(blog);
	} catch (ex) {
		return next(ex);
	}
};

/**
 *	@desc	Create a new blog
 *	@method POST
 *	@route /blogs
 *
 */
exports.createBlog = async (req, res, next) => {
	let { image, author } = req.body;

	if (req.user) author = req.user._id;
	if (req.file) image = req.file.filename;
	// TODO: delete file if any error in uploadImageController
	// separate imageUploadRoute?

	try {
		let newBlog = new Blog({ ...req.body, image, author });

		await newBlog.save();

		return res.json(newBlog);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Update blog by id
 *	@method PUT
 *	@param blogId
 *	@route /blogs/:id
 *
 *	Test if user id has same value as blog author id
 *	Check if image exists, remove it and replace with a new one
 *
 */
exports.updateBlog = async (req, res, next) => {
	const fetchedBlog = await Blog.findById(req.params.id);
	if (!fetchedBlog) return next('No such blog!');

	// check user privilages for write;
	const isAUthor = await fetchedBlog.verifyAuthor(req.user._id);
	if (!isAUthor) return next('Invalid Permission!');

	try {
		// replace and(or) delete current image if exists and set new value of it;
		let image = await replaceImage(fetchedBlog.image, 'blogs', req);
		if (!image) image = fetchedBlog.image;

		const updatedBlog = await fetchedBlog.set({ ...req.body, image });
		await updatedBlog.save();

		return res.json(updatedBlog);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Delete blog by id
 *	@method DELETE
 *	@param blogId
 *	@route /blogs/:id
 *
 *	@TODO in the @frontEnd Check human verification by validate the generated numbers. If it passes the test then apply requested route for delete action.
 *
 */
exports.deleteBlog = async (req, res, next) => {
	try {
		const fetchedBlog = await Blog.findById(req.params.id);
		if (!fetchedBlog) return next('No such blog!');

		// check user privillages for write;
		const isAUthor = await fetchedBlog.verifyAuthor(req.user._id);
		if (!isAUthor) return next('Invalid Permission!');

		await deleteImage(fetchedBlog.image, 'blogs');

		await fetchedBlog.remove();

		return res.json({
			_id: fetchedBlog._id,
			title: fetchedBlog.title,
			author: fetchedBlog.author
		});
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Like a blog
 *	@method PATCH
 *	@param blogId
 *	@route /blogs/:id/addLike
 *
 */
exports.addBlogLike = async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id).select('likes likedBy');
		if (!blog) return next('No such blog');

		const likedBlog = await addLike(blog, req.user);
		if (!likedBlog) return next('Failed to like this blog!');

		await likedBlog.save();
		return res.json(likedBlog);
	} catch (ex) {
		return ex.message;
	}
};

/**
 *	@desc	Dislike a blog
 *	@method PATCH
 *	@param blogId
 *	@route /blogs/:id/removeLike
 *
 */
exports.removeBlogLike = async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id).select('likes likedBy');
		if (!blog) return next('No such blog!');

		const dislikedBlog = await removeLike(blog, req.user);
		if (!dislikedBlog) return next('Failed to dislike!');

		await dislikedBlog.save();

		return res.json(dislikedBlog);
	} catch (ex) {
		return ex.message;
	}
};

//	#endregion ## Blog Controllers ##

//	#region !! Category Controllers !!

/**
 *	@desc Get all categories
 *	@method GET
 *	@queries sort, select, page, limit, field, value
 *	@route /cats/search
 *
 *	## Example Route:
 *
 *	/cats/search?page=2&limit=1&sort=createdAt&field=name&value=test
 *
 */
exports.getCats = async (req, res, next) => {
	try {
		const que = new MyQuerify(req.query);
		const cats = await Cat.find(que.search())
			.sort(que.sort())
			.select(que.select())
			.limit(que.limit())
			.skip(que.skip());

		res.json({ total: cats.length, doc: cats });
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Get category by id (unfiltered)
 *	@method GET
 *	@param categoryId
 *	@route /cats/:id
 *
 */
exports.getCat = async (req, res, next) => {
	try {
		const cat = await Cat.findById(req.params.id);
		if (!cat) return res.send('No such cat!');

		return res.json(cat);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	To Get categories by author
 *	@method GET
 *	@param authorId
 *	@route /cats/author/:id
 *
 */
exports.getCatsByAuthor = async (req, res, next) => {
	try {
		const cats = await Cat.find({ author: req.params.id });
		if (!cats) return res.send('Failed to fetch categories by author!');

		res.json(cats);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Create new category
 *	@method POST
 *	@route /cats
 *
 *	Check name existence, then set slug based on title
 *	Set author field based on loggedIn user id
 *	Set image field based on previous image upload middleware result
 */
exports.createCat = async (req, res, next) => {
	let { author, image } = req.body;

	if (req.user) author = req.user._id;
	if (req.file) image = req.file.filename;

	try {
		const newCat = new Cat({ ...req.body, author, image });

		await newCat.save();

		return res.json(newCat);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Update category by id
 *	@method PUT
 *	@param categoryId
 *	@route /cats/:id
 *
 *	Test the user permission.
 *	Check if image exists, remove it and replace with a new one
 *
 */
exports.updateCat = async (req, res, next) => {
	const cat = await Cat.findById(req.params.id);
	if (!cat) return res.send('No such cat!');

	const isAUthor = await cat.verifyAuthor(req.user._id);
	if (!isAUthor) return next('Invalid Permission!');

	try {
		let image = await replaceImage(cat.image, 'cats', req);
		if (!image) image = cat.image;

		const updatedCat = cat.set({ ...req.body, image });
		await cat.save();

		return res.json(updatedCat);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Delete category by id
 *	@method DELETE
 *	@param categoryId
 *	@route /cats/:id
 *
 *	@TODO in the @frontEnd Check human verification by validate the generated numbers. If it passes the test then apply requested route for delete action.
 *
 */
exports.deleteCat = async (req, res, next) => {
	const cat = await Cat.findById(req.params.id);
	if (!cat) return next('No such category!');

	// check user privillages for write;
	const isAUthor = await cat.verifyAuthor(req.user._id);
	if (!isAUthor) return next('Invalid Permission!');

	try {
		await deleteImage(cat.image, 'cats');

		await cat.remove();

		return res.json({
			_id: cat._id,
			title: cat.title,
			author: cat.author
		});
	} catch (ex) {
		return next(ex.message);
	}
};

//	#endregion ## Category Controllers ##

//	#region !! Comments Controllers !!

/**
 *	@desc Get all comments from a dicussion
 *	@method GET
 *	@param discussionId
 *	@queries sort, select, page, limit
 *	@route /comments/discussion/:id?sort=createdAt&page=1&limit=2
 *
 */
exports.getComments = async (req, res, next) => {
	const discussion = req.params.id;
	if (!discussion) return next('No discussion provided!');

	const que = new MyQuerify(req.query);

	try {
		const comments = await Comment.find({ discussion })
			.populate({ path: 'author', select: 'name username photo' })
			.select('-__v -updatedAt')
			.sort(que.sort())
			.limit(que.limit())
			.skip(que.skip());

		return res.json(comments);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Create new comment to a discussion
 *	@method POST
 *	@param discussionId
 *	@route /comments/discussion/:id
 *
 */
exports.createComment = async (req, res, next) => {
	if (!req.params.id) return next('No discussion provided!');
	if (req.file) req.body.image = req.file.filename;

	req.body.discussion = req.params.id;
	req.body.author = req.user._id;

	try {
		const newComment = new Comment({ ...req.body });
		await newComment.save();

		return res.json(newComment);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc GET comment by id
 *	@method GET
 *	@param commentId
 *	@route /comments/:id
 *	@populate author (name, username, photo, createdAt)
 *
 */
exports.getCommentById = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.id).populate({
			path: 'author',
			select: 'name username photo createdAt'
		});
		if (!comment) return next('No such comment!');

		return res.json(comment);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Update comment by id
 *	@method PUT
 *	@param commentId
 *	@route /comments/:id
 *
 * This will only update the text and updatedAt
 *
 */
exports.updateCommentById = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) return next('No such comment!');

		const isAUthor = await comment.verifyAuthor(req.user._id);
		if (!isAUthor) return next('Invalid Permission!');

		const updatedComment = await comment.set({ text: req.body.text });
		await updatedComment.save();

		return res.json(updatedComment);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Delete comment by id
 *	@method DELETE
 *	@param commentId
 *	@route /comments/:id
 *
 */
exports.deleteCommentById = async (req, res, next) => {
	const comment = await Comment.findById(req.params.id);
	if (!comment) return next('No such comment!');

	const isAUthor = await comment.verifyAuthor(req.user._id);
	if (!isAUthor) return next('Invalid Permission!');

	try {
		await deleteImage(comment.image, 'comments');

		/** @TODO Apply deleteMany if there'is children along with all bounded images from the filesystem */

		await comment.remove();

		return res.json(comment);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc Get children comments
 *	@method GET
 *	@param parentCommentId
 *	@queries sort, limit, skip
 *	@route /comments/parent/:id
 *
 *	## Example route
 *
 *	/comments/parent/5ee6cdd79f639e1f35bb60b8?page=2&limit=1&sort=createdAt&field=name&value=test
 *
 */
exports.getChildrenComments = async (req, res, next) => {
	try {
		const que = new MyQuerify(req.query);
		const children = await Comment.find({ parent: req.params.id })
			.select(' -__v -updatedAt')
			.sort(que.sort())
			.limit(que.limit())
			.skip(que.skip());

		if (!children) return next('No children comments!');

		return res.json(children);
	} catch (ex) {
		return next(ex.message);
	}
};

/**
 *	@desc	Like a comment by id
 *	@method PATCH
 *	@param commentId
 *	@route /comments/:id/addLike
 *
 */
exports.addCommentLike = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.id).select(
			'likes likedBy'
		);
		if (!comment) return next('No such comment');

		const likedComment = await addLike(comment, req.user);
		if (!likedComment) return next('Failed to like this comment!');

		await likedComment.save();
		return res.json(likedComment);
	} catch (ex) {
		return ex.message;
	}
};

/**
 *	@desc	Dislike a comment by id
 *	@method PATCH
 *	@param commentId
 *	@route /comments/:id/removeLike
 *
 */
exports.removeCommentLike = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.id).select(
			'likes likedBy'
		);
		if (!comment) return next('No such comment!');

		const dislikedComment = await removeLike(comment, req.user);
		if (!dislikedComment) return next('Failed to dislike!');

		await dislikedComment.save();

		return res.json(dislikedComment);
	} catch (ex) {
		return ex.message;
	}
};
//	#endregion ## Comments Controllers ##
