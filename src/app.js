// import packages
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';


// rest object
const app = express();

// dotenv config
dotenv.config({ path: './.env' });
const port = process.env.PORT || 3000;

// middleware
app.use(
	cors({
		origin: process.env.ORIGIN,
		credentials: true, //* ???
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static("public"))

// import routers
import testRoutes from './routes/test.route.js'

// routes
app.use('/api/v1', testRoutes)

export default app