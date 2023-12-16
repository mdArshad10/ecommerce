import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'plz add the product'],
		},
		description: {
			type: String,
			required: [true, 'plz add the description'],
		},
		price: {
			type: Number,
			required: [true, 'plz give the price'],
		},
		stock: {
			type: Number,
			required: [true, 'plz add the stock'],
			min: 0,
		},
		categroy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Categroy',
		},
		images: [
			{
				public_id: {
					type: String,
				},
				url: {
					type: String,
				},
			},
		],
	},
	{ timestamps: true },
);

export const Product = mongoose.model('Product', productSchema);
