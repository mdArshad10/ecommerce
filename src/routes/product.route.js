// import package
import { Router } from 'express';
import {
	getAllProduct,
    getParticularProduct,
	updateParticularProduct,
	deleteParticularProduct,
} from '../controllers/product.controller.js';

// router object
const router = Router();

// routes
router.route('/product/getAllProduct').get(getAllProduct);
router
	.route('/product/:id')
	.get(getParticularProduct)
	.put(updateParticularProduct)
	.delete(deleteParticularProduct);

// default
export default router;
