import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/user.model.js";

// FOR USER
const isAuth = async(req,res,next)=>{
    //1. take token from cookies
    const {token} = req.cookies
    // 2. validate token - token is not empty
    if(!token) throw new ErrorHandler(404,"token is not exist")

    // 3. decode the token
    const decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    // 4. token is valid or not
    const existUser = await User.findById(decode._id)
    if(!existUser) throw new ErrorHandler(400, "invald token")

    // 5. pass the token data from "req" to one middleware to another middleware
    req.user = existUser;
    next()
}

// FOR ADMIN
const isAdmin = async(req,res,next)=>{
    if(req.user.role!=="admin") throw new ErrorHandler(403,"your are not admin")
    next();
}

export {isAuth, isAdmin}