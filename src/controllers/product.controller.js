import { AsyncHandler } from '../utils/AsyncHandler.js';
import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import ErrorHandler from '../utils/ErrorHandler.js'

// @Desc: get all the product
// @Method: [GET]    api/v1/product/getAllProduct
// @Access: private
const getAllProduct = AsyncHandler(async (req, res, next) => {
	const products = await Product.find({});

	res
		.status(200)
		.json(new ApiResponse(200, products, 'fetch all data successfully'));
});

// @Desc: get a product
// @Method: [GET]    api/v1/product/:id(kdfalkdflakdfl)
// @Access: private
const getParticularProduct = AsyncHandler(async (req, res, next) => {
	const {id} =req.params;
	const existProduct = await Product.findById(id)
	console.log(existProduct);
	if(!existProduct) throw new ErrorHandler(404,"product is not found",["CastError"])

	res.status(200).json(new ApiResponse(200,existProduct,"get all product"));
});

// @Desc: update a product
// @Method: [PUT]    api/v1/product/:id(kdfalkdflakdfl)
// @Access: private
const updateParticularProduct = AsyncHandler(async (req, res, next) => {
	res.status(200).json({ message: 'update a particular product' });
});

// @Desc: delete a product
// @Method: [DELETE]    api/v1/product/:id(kdfalkdflakdfl)
// @Access: private
const deleteParticularProduct = AsyncHandler(async (req, res, next) => {
	res.status(200).json({ message: 'delete a particular product' });
});

export {
	getAllProduct,
	getParticularProduct,
	updateParticularProduct,
	deleteParticularProduct,
};
