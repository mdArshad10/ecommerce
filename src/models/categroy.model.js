import mongoose from 'mongoose';

const categroySchema = new mongoose.Schema(
	{
		categroy: {
			type: String,
			required: [true, 'plz add the categroy'],
			enum:["laptop","bag","mobile"],
		},
	},
	{ timestamps: true },
);

export const Categroy = mongoose.model('Categroy', categroySchema);
