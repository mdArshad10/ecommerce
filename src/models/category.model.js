import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	categroy: {
		type: String,
		required: [true, 'plz add the categroy'],
		enum: ['laptop', 'bags', 'phone'],
	},
});

export default Categroy = mongoose.model('categroy', categorySchema);
