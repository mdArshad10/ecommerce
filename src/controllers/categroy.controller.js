import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { Categroy } from '../models/categroy.model.js';
import { Product } from '../models/product.model.js';

// @Desc: get all the categroy
// @Method: [GET]    api/v1/categroy/getAllCategroy
// @Access: public ✅
const getAllCategroy = AsyncHandler(async (req, res, next) => {
	const categories = await Categroy.find({});
	res.json(new ApiResponse(200, categories, 'get all categories'));
});

// @Desc: get a particular categroy
// @Method: [get]    api/v1/categroy/:kdfakdfalkdf
// @Access: private ✅
const getParticularCategroy = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const existCategroy = await Categroy.findById(id);
	if (!existCategroy) throw new ErrorHandler(404, 'categroy not found');
	res
		.status(200)
		.json(new ApiResponse(200, existCategroy, 'you get that data'));
});

// @Desc: create the categroy
// @Method: [POST]    api/v1/categroy/create
// @Access: private ✅
const createCategroy = AsyncHandler(async (req, res, next) => {
	const { categroy } = req.body;
	if (!categroy) throw new ErrorHandler(400, 'categroy is not found');
	await Categroy.create({ categroy });
	res
		.status(200)
		.json({ message: 'categroy created successfully', success: true });
});

// @Desc: delete the categroy
// @Method: [DELETE]    api/v1/categroy/:kdfakdfalkdf
// @Access: private ✅
const deleteCategroy = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const existCategroy = await Categroy.findById(id);

	if (!existCategroy) throw new ErrorHandler(400, 'categroy not found');

	// find the product and update the product
	const products = await Product.find({ categroy: existCategroy._id });
	for (let i = 0; i < products.length; i++) {
		const product = products[i];
		product.categroy = undefined;
		await product.save();
	}
	await existCategroy.deleteOne();
	res
		.status(200)
		.json({ message: 'delete the categroy successfully', success: true });
});

// @Desc: update the categroy
// @Method: [PUT]    api/v1/categroy/:kdfakdfalkdf
// @Access: private ✅
const updateCategroy = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { updateCategroy } = req.body;
	const existCategroy = await Categroy.findById(id);

	if (!existCategroy) throw new ErrorHandler(400, 'categroy not found');

	// find the product and update the product
	const products = await Product.find({ categroy: existCategroy._id });
	for (let i = 0; i < products.length; i++) {
		const product = products[i];
		product.categroy = updateCategroy;
		await product.save();
	}
	await existCategroy.updateOne({ categroy: updateCategroy });
	res
		.status(200)
		.json({ message: 'categroy update successfully', success: true });
});

export {
	getAllCategroy,
	updateCategroy,
	createCategroy,
	getParticularCategroy,
	deleteCategroy,
};
