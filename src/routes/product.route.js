// import package
import { Router } from 'express';
import {
	createProduct,
	getAllProduct,
	getParticularProduct,
	updateParticularProduct,
	deleteParticularProduct,
} from '../controllers/product.controller.js';
import { isAdmin, isAuth } from '../middlewares/auth.middleware.js';
import { singleUpload } from '../middlewares/multer.middleware.js';

// router object
const router = Router();

// routes
// get all product
router.route('/product/getAllProduct').get(getAllProduct);
// create the product
router
	.route('/product/createNewProduct')
	.post(isAuth, isAdmin, singleUpload, createProduct);

router
	.route('/product/:id')
	// get a particular product
	.get(getParticularProduct)
	// update the particular product
	.put(isAuth, isAdmin, updateParticularProduct)
	//delete the product particular
	.delete(isAuth, isAdmin, deleteParticularProduct);

// default
export default router;
