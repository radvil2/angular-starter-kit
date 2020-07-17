const router = require('express').Router();
const {
	getCats,
	getCatsByAuthor,
	getCat,
	createCat,
	updateCat,
	deleteCat
} = require('../../controllers/blog.controller');
const { uploadCatImage } = require('../../middlewares/multer');
const { checkAuth } = require('../../middlewares/verification');

// public routes
router.route('/').get(getCats); // remove this !! or set checkRole only root;
router.route('/:id').get(getCat);
router.route('/author/:id').get(getCatsByAuthor);

// restricted routes
router.route('/').post(checkAuth, uploadCatImage, createCat);
router
	.route('/:id')
	.put(checkAuth, uploadCatImage, updateCat)
	.delete(checkAuth, deleteCat);

module.exports = router;
