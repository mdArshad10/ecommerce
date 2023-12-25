import { User } from '../models/user.model.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { fileUploading } from '../utils/cloudinary.js';

// @Desc: for register the user 
// @Method: POST    api/v1/user/register
// @Access: public
const registerUser = AsyncHandler(async (req, res, next) => {
	// 1. take all data from user
	const { username, email, password, address, city, country, phone } = req.body;

	//2. check the filed
	if (
		[username, email, password, address, city, country, phone].some(
			(item) => item?.trim === '',
		)
	) {
		throw new ErrorHandler(404, 'plz fill all the field');
	}

	// 3. check the any email or username is already present or not
	const existUser = await User.findOne({ $or: [{ email }, { username }] });
	if (existUser) throw new ErrorHandler(400, 'user already exist');

	// 4. create a user object
	const newUser = await User.create({
		username,
		email,
		password,
		address,
		city,
		country,
		phone,
	});

	// 5. check your is create or not and remove the password
	const userCreated = await User.findById(newUser?._id).select('-password');

	if (!userCreated) throw new ErrorHandler(402, 'user not create');

	// 6. send the request
	res
		.status(201)
		.json(new ApiResponse(201, { user: userCreated }, 'your are registerd'));
});

// @Desc: for login the user 
// @Method: POST    api/v1/user/login
// @Access: public
const loginUser = AsyncHandler(async (req, res, next) => {
	// 1. take the data from frontend
	const { email, password, username } = req.body;

	// 2. check the validation
	if (!(email || username) || !password)
		throw new ErrorHandler(404, 'plz add all the field');

	// 3.check the email is registered in database
	const existUser = await User.findOne({ $or: [{ email }, { username }] });
	if (!existUser)
		throw new ErrorHandler(404, 'invalid crediental or  not exist');

	//4. check the email or password match with db
	const isPasswordMatch = await existUser.isPasswordCorrect(password);
	if (!isPasswordMatch) {
		throw new ErrorHandler(404, 'invalid email or password');
	}

	// 6. create a seesion(token) in backend
	const token = existUser.generateToken();

	// 7.remove the password
	const userData = await User.findById(existUser._id).select('-password');

	// 8. send the res
	const option = {
		httpOnly: true,
		secure: true,
	};
	res
		.status(200)
		.cookie('token', token, option)
		.json(
			new ApiResponse(200, { userData, token }, 'your are login successfully'),
		);
});

// @Desc: get detail of a particualr user
// @Method: GET    api/v1/user/profile
// @Access: private
const getUserProfile = AsyncHandler(async (req, res, next) => {
	res.status(200).json(new ApiResponse(200, { user: req.user }));
});

// @Desc: logout the user
// @Method: GET    api/v1/user/logout
// @Access: private
const logoutUser = AsyncHandler(async (req, res, next) => {
	const option = {
		httpOnly: true,
		secure: true,
	};
	res
		.status(200)
		.clearCookie('token', option)
		.json(new ApiResponse(200, {}, 'your are logout successfully'));
});

// @Desc: update the user
// @Method: PUT    api/v1/user/profile-update
// @Access: private
const updateUserProfile = AsyncHandler(async (req, res, next) => {
	// get user
	const user = await User.findById(req.user?._id).select('-password');

	const { username, email, address, city, country, phone } = req.body;

	if (username) user.username = username;
	if (email) user.email = email;
	if (address) user.address = address;
	if (city) user.city = city;
	if (country) user.country = country;
	if (phone) user.phone = phone;

	await user.save({ validateBeforeSave: false });

	res
		.status(202)
		.json(new ApiResponse(202, { user }, 'update successfully'));
});

// @Desc: update user's password
// @Method: PUT    api/v1/user/update-password
// @Access: private
const updateUserPassword = AsyncHandler(async (req, res, next) => {
	// 1. get old and new password from frontend
	const { oldPassword, newPassword } = req.body;

	// 2. check validation - oldpassword and newPassword
	if ([oldPassword, newPassword].some((item) => item?.trim() === ''))
		throw new ErrorHandler(400, 'fill all the field');

	// const existUser = await User.findById(req.user._id);
	const existUser = await User.findById(req.user?._id);

	// 3. check the oldpassword is correct or not
	const isPasswordMatch = await existUser.isPasswordCorrect(oldPassword);
	if (!isPasswordMatch) {
		throw new ErrorHandler(404, 'invalid email or password');
	}
	//4. oldpassword or newpassword must be different
	if (oldPassword === newPassword)
		throw new ErrorHandler(400, 'both must be different');

	existUser.password = newPassword;

	await existUser.save({ validateBeforeSave: false });
	res
		.status(200)
		.json({ message: 'password update successfully', success: true });
});

// @Desc: update user's profile pic
// @Method: PUT    api/v1/user/updateProfilePicture
// @Access: private
const updateUserProfilePic = AsyncHandler(async (req, res, next) => {
	const user = req.user;
	const file = req.file;
	console.log(file);
	if (!file) throw new ErrorHandler(404, 'file not present');

	const fileDetail = await fileUploading(file.path);

	user.profilePic = { public_id: fileDetail.public_id, url: fileDetail.url };

	await user.save({ validateBeforeSave: false });
	res.status(200).json({
		message: 'profile update successfully',
		user,
		success: true,
	});
});

export {
	registerUser,
	loginUser,
	getUserProfile,
	logoutUser,
	updateUserProfile,
	updateUserPassword,
	updateUserProfilePic,
};
