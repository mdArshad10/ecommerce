// import packages
import {Router} from 'express'
import {getAllCategory, updateCategory} from '../controllers/category.controller.js'
// router object
const router = Router();

//router
router.route('/category/getAllCategory').get(getAllCategory)
router.route('/category/:id').put(updateCategory)

// exports
export default router;