const router = require('express').Router();
const {
	getComments,
	createComment,
	getCommentById,
	updateCommentById,
	deleteCommentById,

	getChildrenComments,
	addCommentLike,
	removeCommentLike
} = require('../../controllers/blog.controller');
const { uploadCommentImage } = require('../../middlewares/multer');
const { checkAuth } = require('../../middlewares/verification');

router
	.route('/discussion/:id')
	.post(checkAuth, uploadCommentImage, createComment)
	.get(getComments);
router.route('/parent/:id').get(getChildrenComments);

router
	.route('/:id')
	.get(getCommentById)
	.put(checkAuth, updateCommentById)
	.delete(checkAuth, deleteCommentById);

router.route('/:id/addLike').patch(checkAuth, addCommentLike);
router.route('/:id/removeLike').patch(checkAuth, removeCommentLike);

module.exports = router;
