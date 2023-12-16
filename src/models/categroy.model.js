import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	categroy: {
		type: String,
		required: [true, 'plz add the categroy'],
		enum: ['laptop', 'bags', 'phone'],
	},
},{timestamps:true});

export const Categroy = mongoose.model('Categroy', categorySchema);
