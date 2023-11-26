import { Router } from 'express';
import {
	loginUser,
	registerUser,
	getUserProfile,
    logoutUser
} from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

// router obj
const router = Router();

//routes
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/profile').get(isAuth, getUserProfile);
router.route('/user/logout').get(isAuth, logoutUser);

export default router;
