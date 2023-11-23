// import packages
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import colors from 'colors';

// import routers

// rest object
const app = express();

// dotenv config
dotenv.config({ path: './env' });
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

// routes
// app.use('/api/v1', )

// listen
app.listen(port, () => {
	console.log(`the server is running at ${port} `.rainbow);
});
