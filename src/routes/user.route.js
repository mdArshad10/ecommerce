import { Router } from 'express';
import {
	loginUser,
	registerUser,
	getUserProfile,
	logoutUser,
	updateUserProfile,
	updateUserPassword,
} from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { singleUpload } from '../middlewares/multer.middleware.js';

// router obj
const router = Router();

//routes
// for registration
router.route('/user/register').post(registerUser);
// for login
router.route('/user/login').post(loginUser);
// get profile
router.route('/user/profile').get(isAuth, getUserProfile);
// logout
router.route('/user/logout').get(isAuth, logoutUser);

// update the user detail
router
	.route('/user/profile-update')
	.put(isAuth, singleUpload, updateUserProfile);

// update the password
router.route('/user/update-password').put(isAuth, updateUserPassword);

export default router;
