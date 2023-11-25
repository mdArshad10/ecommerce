import express from 'express';
import { testController } from '../controllers/test.controller.js';

// route object
const router = express.Router();

// routes
router.route('/test').post(testController);

// export
export default router;
