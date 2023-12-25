import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { Order } from '../models/order.model.js';
import { User } from '../models/user.model.js';
import { Product } from '../models/product.model.js';
import {Stripe} from '../constent.js'

// @Desc: customer give the order
// @Method: [POST]    api/v1/order/create
// @Access: private
const giveTheOrder = AsyncHandler(async (req, res, next) => {
	const {
		user,
		totalPrice,
		shippingInfo: { address: shipAdd, city: shipCity, country: shipCountry },
		orderItems: {
			name: orderName,
			price,
			quantity: orderQuantity,
			image: orderImage,
			product,
		},
		paymentInfo,
		itemPrice,
		tax,
		shippingCharges,
	} = req.body;

	if (
		[
			orderName,
			price,
			orderQuantity,
			orderImage,
			product,
			shipAdd,
			shipCity,
			shipCountry,
			totalPrice,
			paymentInfo,
			itemPrice,
			tax,
			shippingCharges,
		].some((field) => field?.trim === '')
	)
		throw new ErrorHandler(404, 'plz add all the field');

	await Order.create({
		user: req.user._id,
		orderItems,
		shipAdd,
		shipCity,
		shipCountry,
		totalPrice,
		paymentInfo,
		itemPrice,
		tax,
		shippingCharges,
	});

	for (let i = 0; i < orderItems.length; i++) {
		const product = await Product.findById(orderItems[i].product);
		product.stock -= orderItems[i].quantity;
		await product.save();
	}
	res
		.status(200)
		.json({ message: 'order is created successfuly', success: true });
});

// @Desc: get all order
// @Method: [GET]    api/v1/order/getAll
// @Access: private
const getAllOrders = AsyncHandler(async (req, res, next) => {
	const orders = await Order.find({ user: req.user?._id });
	if (orders) throw new ErrorHandler(404, 'no order found');

	res.json(
		new ApiResponse(200, { length: orders.length, orders }, 'get all order'),
	);
});

// @Desc: get a particular order detail
// @Method: [GET]    api/v1/order/:id(kdfjladjfakjdlfv)
// @Access: private
const getParticularOrder = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const existOrder = await Order.findById(id);
	if (existOrder) throw new ErrorHandler(404, 'order not found');

	res.json(new ApiResponse(200, existOrder, 'you get the particular order'));
});

// @Desc: payment the order
// @Method: [GET]    api/v1/order/payment
// @Access: private
const getPayment = AsyncHandler(async(req,res,next)=>{
	const {amount} = req.body;
	if(!amount) throw new ErrorHandler(404,"amount is not found")

	const {client_secret} = await Stripe.paymentIntents.create({
		amount,
		currency: "inr",
	})

	res.json(new ApiResponse(200, client_secret, "payment successfuly done"))
})



export { giveTheOrder, getAllOrders, getParticularOrder,getPayment };
