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
	updatePassword,
	requestPrivateUser,
	requestNewTokens
} = require('../../controllers/user/user.controller');
const { uploadUserPhoto } = require('../../middlewares/multer');
const {
	checkAuth,
	checkRole,
	verifyUser
} = require('../../middlewares/verification');

// public routes;
router.route('/register').post(uploadUserPhoto, registerUser);
router.route('/login').post(loginUser);
router.route('/public-profile/:username').get(getProfile);
router.route('/refresh-token').get(requestNewTokens);

// restricted route;
router.route('/').get(checkAuth, checkRole(['root', 'admin']), getUsers);
router.route('/search').get(checkAuth, searchUsers);
router.route('/private-profile').get(checkAuth, requestPrivateUser);

router
	.route('/updatePassword/:id')
	.patch(checkAuth, verifyUser, updatePassword);

router
	.route('/:id')
	.get(checkAuth, verifyUser, getUser)
	.put(checkAuth, verifyUser, uploadUserPhoto, updateUser)
	.delete(checkAuth, verifyUser, deleteUser);

module.exports = router;
