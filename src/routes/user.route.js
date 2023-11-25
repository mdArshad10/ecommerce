import {Router} from 'express'
import { loginUser, registerUser } from '../controllers/user.controller.js';

// router obj
const router = Router();

//routes
router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)

export default router