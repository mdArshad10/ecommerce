import { AsyncHandler } from '../utils/AsyncHandler.js';
import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// @Desc: get all the product
// @Method: [GET]    api/v1/product/getAllProduct
// @Access: private
const getAllProdcts = AsyncHandler(async (req, res, next) => {
	const products = await Product.find({});

	res
		.status(200)
		.json(new ApiResponse(200, products, 'fetch all data successfully'));
});

// @Desc: get a product
// @Method: [GET]    api/v1/product/:id(kdfalkdflakdfl)
// @Access: private
const getParticularProduct = AsyncHandler(async (req, res, next) => {
	res.status(200).json({ message: 'get a prodct' });
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
	getAllProdcts,
	getParticularProduct,
	updateParticularProduct,
	deleteParticularProduct,
};
