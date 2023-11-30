// import package
import { Router } from 'express';
import {
	createProduct,
	getAllProduct,
	getParticularProduct,
	updateParticularProduct,
	deleteParticularProduct,
} from '../controllers/product.controller.js';

// router object
const router = Router();

// routes
router.route('/product/getAllProduct').get(getAllProduct);
router.route('/product/createNewProduct').post(createProduct);
router
	.route('/product/:id')
	.get(getParticularProduct)
	.put(updateParticularProduct)
	.delete(deleteParticularProduct);

// default
export default router;
