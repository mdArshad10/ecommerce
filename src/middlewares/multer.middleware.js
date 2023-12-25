import multer from 'multer';

const storage = multer.diskStorage({});

const upload = multer({ storage });

const singleUpload = upload.single('avatar');

const multipleUpload = upload.fields([
	{
		name: 'main',
		maxCount: 1,
	},
	{
		name: 'slide2',
		maxCount: 1,
	},
]);

export { singleUpload, multipleUpload };
