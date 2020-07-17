const router = require('express').Router();
const {
	registerUser,
	loginUser,
	getProfile,
	searchUsers,

	getUsers,
	getUser,
	updateUser,
	deleteUser,
	updatePassword
} = require('../../controllers/user.controller');
const { uploadUserPhoto } = require('../../middlewares/multer');
const {
	checkAuth,
	checkRole,
	verifyUser
} = require('../../middlewares/verification');

// public routes;
router.route('/register').post(uploadUserPhoto, registerUser);
router.route('/login').post(loginUser);
router.route('/profile/:username').get(getProfile);

// restricted route;
router.route('/').get(checkAuth, checkRole(['root', 'admin']), getUsers);

router
	.route('/:id')
	.get(checkAuth, verifyUser, getUser)
	.put(checkAuth, verifyUser, uploadUserPhoto, updateUser)
	.delete(checkAuth, verifyUser, deleteUser);

router.route('/search').get(checkAuth, searchUsers);

router
	.route('/updatePassword/:id')
	.patch(checkAuth, verifyUser, updatePassword);

module.exports = router;
