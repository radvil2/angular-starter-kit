const router = require('express').Router();
const {
	getBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
	addBlogLike,
	removeBlogLike
} = require('../../controllers/blog.controller');
const { checkAuth } = require('../../middlewares/verification');
const { uploadBlogImage } = require('../../middlewares/multer');

// public routes
router.route('/').get(getBlogs);
router.route('/:id').get(getBlog);

// restricted routes
router.route('/').post(checkAuth, uploadBlogImage, createBlog);
router.route('/:id').put(checkAuth, uploadBlogImage, updateBlog);
router.route('/:id').delete(checkAuth, deleteBlog);
router.route('/:id/addLike').patch(checkAuth, addBlogLike);
router.route('/:id/removeLike').patch(checkAuth, removeBlogLike);

module.exports = router;
