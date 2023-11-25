const testController = (req, res, next) => {
	console.log(req);
	const {name} = req.body;
	console.log(name);
 	res.status(200).json({ name,message: 'this is for testing' });
};

export { testController };
