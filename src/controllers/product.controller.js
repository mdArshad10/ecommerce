import { AsyncHandler } from '../utils/AsyncHandler.js';
import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { fileUpdate, fileUploading } from '../utils/cloudinary.js';
import { Categroy } from '../models/categroy.model.js';

// @Desc: create the product
// @Method: [POST]    api/v1/product/createNewProduct
// @Access: private
const createProduct = AsyncHandler(async (req, res, next) => {
	const { name, description, price, stock, categroy } = req.body;
	if (
		[name, description, price, stock, categroy].some(
			(item) => item?.trim === '',
		)
	)
		throw new ErrorHandler(400, 'plz fill all the field');

	const file = req.file;

	if (!file) throw new ErrorHandler(404, "file doesn't exist");

	const fileResp = await fileUploading(file.path);
	const image = { url: fileResp.url, public_id: fileResp.public_id };

	const existCategroy = await Categroy.findOne({ categroy });
	if (!existCategroy) {
		throw new ErrorHandler(404, 'category not found');
	}
	// file handling adding
	const newProduct = await Product.create({
		name,
		description,
		price,
		stock,
		images: [image],
		categroy: existCategroy._id,
	});

	res
		.status(200)
		.json(new ApiResponse(200, newProduct, 'new product add successfully'));
});

// @Desc: get all the product
// @Method: [GET]    api/v1/product/getAllProduct
// @Access: public
const getAllProduct = AsyncHandler(async (req, res, next) => {
	const products = await Product.find();
	res
		.status(200)
		.json(new ApiResponse(200, products, 'fetch all data successfully'));
});

// @Desc: get a product
// @Method: [GET]    api/v1/product/:id(kdfalkdflakdfl)
// @Access: public
const getParticularProduct = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const existProduct = await Product.findById(id);
	console.log(existProduct);
	if (!existProduct)
		throw new ErrorHandler(404, 'product is not found', ['CastError']);

	res.status(200).json(new ApiResponse(200, existProduct, 'get all product'));
});

// @Desc: update a product
// @Method: [PUT]    api/v1/product/:id(kdfalkdflakdfl)
// @Access: private
const updateParticularProduct = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const existProduct = await Product.findById(id);
	if (!existProduct) throw new ErrorHandler(404, 'product is not found');
	const { name, description, price, stock, categroy } = req.body;
	if (name) existProduct.name = name;
	if (description) existProduct.description = description;
	if (price) existProduct.price = price;
	if (stock) existProduct.stock = stock;
	if (categroy) existProduct.categroy = categroy;

	existProduct.save();
	res
		.status(200)
		.json({ message: 'product update successfully', success: true });
});

// @Desc: delete a product
// @Method: [DELETE]    api/v1/product/:id(kdfalkdflakdfl)
// @Access: private
const deleteParticularProduct = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const existProduct = await Product.findByIdAndDelete(id);
	if (!existProduct) throw new ErrorHandler(404, 'product is not found');
	res.status(200).json({ message: 'product is deleted', success: true });
});

export {
	createProduct,
	getAllProduct,
	getParticularProduct,
	updateParticularProduct,
	deleteParticularProduct,
};
