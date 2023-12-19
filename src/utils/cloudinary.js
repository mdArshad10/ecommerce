import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploading = async (localfilePath) => {
	try {
		console.log(`the localfilePath ${localfilePath}`);
		if (!localfilePath) return null;
		const resp = await cloudinary.uploader.upload(localfilePath, {
			resource_type: 'auto',
		});
		console.log(`the respose of file is ${resp}`);
		console.log(
			`the file is upload with the name of ${resp.original_filename}`,
		);
		return resp;
	} catch (error) {
		console.log('the error in cloudinary');
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
		return null;
	}
};

export { fileUploading, fileUpdate };
