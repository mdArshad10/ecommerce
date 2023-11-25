import { Router } from 'express';
import {
	loginUser,
	registerUser,
	getUserProfile,
} from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

// router obj
const router = Router();

//routes
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/profile').get(isAuth, getUserProfile);

export default router;
