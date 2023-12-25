// import packages
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { FileNotFound } from './middlewares/filenotfound.middleware.js';
import { corsOrigin } from './constent.js';

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(
	cors({
		origin: corsOrigin,
		credentials: true,
	}),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cookieparser());

// import routers
import testRoutes from './routes/test.route.js';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import categroyRoutes from './routes/categroy.route.js';
import orderRoutes from './routes/order.route.js';

// routes
app.use('/api/v1', testRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/categroy', categroyRoutes);
app.use('/api/v1', orderRoutes);

app.use("*",(req,res,next)=>{
	res.status(404).json({
		message:"page not found"
	})
})

export default app;
