import { AsyncHandler } from '../utils/AsyncHandler.js';
import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// @Desc: get all the category
// @Method: [GET]    api/v1/category/getAllCategory
// @Access: public
const getAllCategory = AsyncHandler(async(req,res,next)=>{

})

export {getAllCategory, updateCategory}