// import packages
import { Router } from 'express';
import {
	getAllCategroy,
	updateCategroy,
	createCategroy,
	getParticularCategroy,
	deleteCategroy,
} from '../controllers/categroy.controller.js';
import { isAuth, isAdmin } from '../middlewares/auth.middleware.js';
// router object
const router = Router();

//router
// get all category ✅
router.route('/getAllCategroy').get(getAllCategroy);
// create the category ✅
router.route('/create').post(isAuth, isAdmin, createCategroy);

router
	.route('/:id') 
	// get particular categroy ✅
	.get(isAuth, isAdmin, getParticularCategroy)
	// update the categroy
	.put(isAuth, isAdmin, updateCategroy)
	// delete the categroy
	.delete(isAuth, isAdmin, deleteCategroy);
// exports
export default router;
