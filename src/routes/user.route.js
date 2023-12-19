import { Router } from 'express';
import {
	loginUser,
	registerUser,
	getUserProfile,
	logoutUser,
	updateUserProfile,
	updateUserPassword,
	updateUserProfilePic
} from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { singleUpload } from '../middlewares/multer.middleware.js';

// router obj
const router = Router();

//routes
// for registration ✅
router.route('/register').post(registerUser);
// for login ✅
router.route('/login').post(loginUser);
// get profile ✅
router.route('/profile').get(isAuth, getUserProfile);
// logout
router.route('/logout').get(isAuth, logoutUser);

// update the user detail ✅
router
	.route('/profile-update')
	.put(isAuth, updateUserProfile);

// update the password ✅
router.route('/update-password').put(isAuth, updateUserPassword);

// update the profile pic
router.route('/updateProfilePicture')
	.put(isAuth ,singleUpload ,updateUserProfilePic)


export default router;
