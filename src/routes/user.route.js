import {Router} from 'express'
import { registerUser } from '../controllers/user.controller.js';

// router obj
const router = Router();

//routes
router.route('/register').post(registerUser)

export default router