import { Router } from 'express';
import { isAuth } from '../middlewares/auth.middleware.js';
import {
	giveTheOrder,
	getAllOrders,
	getParticularOrder,
	getPayment
} from '../controllers/order.controller.js';

const router = Router();
// create
router.route('/order/create').post(isAuth, giveTheOrder);

// get all order
router.route('/order/getAll').get(isAuth, getAllOrders);

// get a particular order detail
router.route('/order/:id').get(isAuth, getParticularOrder);

// order payment
router.route('/order/payment').post(isAuth ,getPayment);

export default router;
