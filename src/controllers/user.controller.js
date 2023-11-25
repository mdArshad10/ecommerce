import { User } from '../models/user.model.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// @Desc: for register the user
// @Method: POST    api/v1/user/register
// @Access: public
const registerUser = AsyncHandler(async (req, res, next) => {
	// 1. take all data from user
	const { username, email, password, address, city, country, phone } = req.body;

	//2. check the filed
	if (
		!username ||
		!email ||
		!password ||
		!address ||
		!city ||
		!country ||
		!phone
	) {
		throw new ErrorHandler(404, 'plz fill all the field');
	}
	// 3. check the any email or username is already present or not
	const existUser = await User.findOne({ $or: [{ email, username }] });
	if (existUser) throw new ErrorHandler(400, 'your already exist');

	// 4. check for profile pic

	// 5. uplaod that into cloudinary

	// 6. create a user object
	const newUser = await User.create({
		username,
		email,
		password,
		address,
		city,
		country,
		phone,
	});

	// 7. check your is create or not and remove the password
	const userCreated = await User.findById(newUser._id).select('-password');

	if (!userCreated) throw new ErrorHandler(402, 'user not create');

	// 8. send the request
	res
		.status(201)
		.json(new ApiResponse(200, userCreated, 'registered user successfully'));
});

// @Desc: for login the user
// @Method: POST    api/v1/user/login
// @Access: public
const loginUser = AsyncHandler(async (req, res, next) => {
	// 1. take the data from frontend
	const { email, password } = req.body;

	// 2. check the validation
	if (!email || !password) throw new ErrorHandler(404, 'plz add all the field');

	// 3.check the email is registered in database
	const existUser = await User.findOne({email});
	if (!existUser)
		throw new ErrorHandler(404, 'invalid crediental or  not exist');

	//4. check the email or password match with db
	const isPasswordMatch = await existUser.isPasswordCorrect(password);
	if (!isPasswordMatch) {
		throw new ErrorHandler(404, 'invalid email or password');
	}

	// 6. create a seesion(token) in backend
	const token = existUser.generateToken()

	// 7.remove the password
	const userData = await User.findOne({email}).select("-password")
	// 8. send the res
	res.status(200)
	.cookie('token', token, {
		expires: new Date(Date.now() + 900000),
		httpOnly: true
	  })
	.json(new ApiResponse(200,{userData,token},"your are login successfully"));
});

export { registerUser, loginUser };
