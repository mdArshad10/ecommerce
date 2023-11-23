const testController = (req, res, next) => {
	res.status(200).json({ message: 'this is for testing' });
};

export { testController };
