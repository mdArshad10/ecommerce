// import packages
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieparser from 'cookie-parser'


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
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended: true,limit:"16kb" }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static("public"))
app.use(cookieparser())

// import routers
import testRoutes from './routes/test.route.js'

// routes
app.use('/api/v1', testRoutes)

export default app