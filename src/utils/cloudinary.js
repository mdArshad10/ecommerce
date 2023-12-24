import { v2 as cloudinary } from 'cloudinary';

import {
	cloudinaryApiKey,
	cloudinaryName,
	cloudinaryApiSecret,
} from '../constent.js';

cloudinary.config({
	cloud_name: cloudinaryName,
	api_key: cloudinaryApiKey,
	api_secret: cloudinaryApiSecret,
});

const fileUploading = async (localfilePath) => {
	try {

		if (!localfilePath) return null;

		const resp = await cloudinary.uploader.upload(localfilePath, {
			resource_type: 'auto',
		});
		
		return resp;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const fileUpdate = async (localfilePath, publicId) => {
	try {
		if (!localfilePath) return null;
		// destroy the file
		await cloudinary.uploader.destroy(publicId);

		// new upload
		const resp = await cloudinary.uploader.upload(localfilePath, {
			resource_type: 'auto',
		});

		console.log(
			`the file is upload with the name of ${resp.original_filename}`,
		);

		return resp;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export { fileUploading, fileUpdate };
