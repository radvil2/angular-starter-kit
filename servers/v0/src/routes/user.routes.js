const { Router } = require('express');
const { authorize } = require('../middlewares/authorize');
const {
	loginSchema,
    registerSchema,
    revokeTokenSchema,
    updatePasswordSchema
} = require('../controllers/user/user.schema');
const CTRL = require('../controllers/user/user.controller');
const Role = require('../configs/role.config');

const router = Router();

/* User(s) routes. */
router.route('/login').post(loginSchema, CTRL.AUTHENTICATE);
router.route('/register').post(registerSchema, CTRL.REGISTER);
router.route('/refresh-token').get(CTRL.REFRESH_TOKEN);
router.route('/revoke-token').post(authorize(), revokeTokenSchema, CTRL.REVOKE_TOKEN);
router.route('/private-profile').get(authorize(), CTRL.REQUEST_PRIVATE_PROFILE);

router.route('/').get(authorize(Role.Admin), CTRL.GET_USERS);
router.route('/:id').get(authorize(), CTRL.GET_USER);
router.route('/:id/public').get(CTRL.REQUEST_PUBLIC_PROFILE);
router.route('/:id/set-public-key').patch(CTRL.SET_PUBLIC_KEY);
router.route('/:id/refresh-tokens').get(authorize(), CTRL.GET_REFRESH_TOKENS);
router.route('/:id/revoke-tokens').post(authorize(), CTRL.REVOKE_ALL_TOKENS);
router
    .route('/:id/update-password')
    .patch(updatePasswordSchema, authorize(), CTRL.UPDATE_USER_PASSWORD);

module.exports = router;
