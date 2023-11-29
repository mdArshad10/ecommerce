// import packages
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import bodyParser from 'body-parser'

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(
	cors({
		origin: process.env.ORIGIN,
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
import productRoutes from './routes/product.route.js'

// routes
app.use('/api/v1', testRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', productRoutes)

export default app;
