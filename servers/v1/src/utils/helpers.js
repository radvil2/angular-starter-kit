const fs = require('fs');
const path = require('path');
const imgDir = path.join(__dirname + process.env.IMG_DIR);

/**
 * @Desc Simple slugify
 * @param new Date
 *
 */
exports.slugDate = async function () {
	return (
		parseInt(new Date().getTime()) + Math.floor(Math.random() * 10)
	).toString();
};

/**
 *	@Desc Helper function make slug of blog title;
 *	Generate some pseudo number for the slug prefix.
 *
 *	##	Example:
 *
 *	if (req.bodytitle) req.body.slug = await slugIt(req.bodytitle);
 *
 */
exports.slugIt = async function (arg) {
	const slug = arg.toString().toLowerCase().split(' ').join('_');
	let result = '';

	function runAlgorithm() {
		let algh = parseInt(
			(Math.floor(Math.random() * ((Math.PI * 666) / Math.random()) * 999) /
				333) *
				1802
		);
		return algh < 0
			? runAlgorithm()
			: parseInt(parseInt(Date.now() + new Date().getTime()) / algh).toString();
	}

	result = runAlgorithm() + '-' + slug;
	return result;
};

/**
 *	@Desc Helper function to validate user pre registration form;
 *	Validate existing data against the database.
 *
 *	##	Example:
 *
 *	await checkExist(User, 'username', username);
 *
 */
exports.checkExist = async (collectionName, key, value) => {
	let opt = {};
	opt[key] = value;

	return (await collectionName.findOne(opt)) ? false : true;
};

/**
 *	@Desc Verify request of user write actions,
 *
 *	##	Example:
 *
 *	await verifyAuthor(req.user._id, fetchedBlog.author);
 *
 *	Current loggedIn user is forbidden to make such requests to any restricted routes of other user's.
 *	@TODO This is currently not used!!
 */
exports.verifyAuthor = async (loggedInUserId, authorId) => {
	return authorId.toString() !== loggedInUserId.toString() ? false : true;
};

/**
 *	@Desc Helper function to replace and(or) update image in db collection;
 *	Validate existing image value, if error throw success response(200) and set the image value as it is by default from the database;
 *	@param currentImage = current saved image in the document collection
 *	@param folderName = select folder for the new saved image
 *	@param req = set req.body from the input & accept req.file from the header
 *
 *	##	Example:
 *
 *	const image = await replaceImage(fetchedBlog.image, 'blogs', req);
 *	@TODO ## PLEASE REFACTOR THIS !! ##
 *
 */
exports.replaceImage = async (currentImage, folderName, req) => {
	const imgPath = imgDir + `/${folderName}/` + currentImage;

	if (req.file) {
		fs.unlink(imgPath, (err) => {
			if (err) req.body.image = currentImage;
		});

		req.body.image = req.file.filename;
	}

	return req.body.image;
};

/**
 *	@Desc Helper function to delete the current existing image based on document's property on the database;
 *
 *	##	Example:
 *
 *	await deleteImage(fetchedBlog.image);
 *
 */
exports.deleteImage = async (currentImage, folderName) => {
	const imgPath = imgDir + `/${folderName}/` + currentImage;

	return fs.unlink(imgPath, (err) => {
		if (err) return err;
		return true;
	});
};

/**
 *	@Desc Helper function to add one like to the blog;
 *	Test if candidate user already likes this blog, then pushes user to the likedBy array, adds likes value by one, then returns the brand new blog object.
 *	If it doesn't pass the test it returns false;
 *	@Param selectedBlog, and candidate user to like
 *
 *	##	Example:
 *
 *	const likedBlog = await addBlogLike(fetchedBlog, req.user);
 *
 */
exports.addLike = async (blog, candidateUser) => {
	if (blog.likedBy.includes(candidateUser.username)) return false;
	blog.likedBy.push(candidateUser.username);
	blog.likes++;

	return blog;
};

/**
 *	@Desc Helper function to remove one like from the blog;
 *	Test if candidate user doesn't exist in the likedBy array, and return false.
 *	If it exists, remove one like from the array of likedBy, and decrease likes value by one.
 *	@Param selectedBlog, and candidate user to like
 *
 *	##	Example:
 *
 *	const dislikedBlog = await removeLike(fetchedBlog, req.user);
 *
 */
exports.removeLike = async (blog, candidateUser) => {
	if (!blog.likedBy.includes(candidateUser.username)) return false;
	blog.likes--;
	blog.likedBy.splice(blog.likedBy.indexOf(candidateUser.username), 1);
	// set a new likedBy array by excluding the selected user;
	// blog.likedBy = blog.likedBy.filter((person) => {
	//   return person !== req.body.name;
	// });
	return blog;
};
