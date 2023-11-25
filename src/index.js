// import packages
import app from './app.js'
import dotenv from 'dotenv';
import colors from 'colors';
import { connectionDB } from './db/db.connection.js';

// dotenv config
dotenv.config({ path: './.env' });
const port = process.env.PORT || 3000;

// db Connection
connectionDB().then(()=>{
	// listen
	app.listen(port, () => {
		console.log(`the server is running at ${port} `.rainbow);
	});
	app.on('erorr',(error)=>{
		console.log('the ERROR is =>'.bgRed, error);
		throw error
	})
}).catch((error)=>{
	console.log('the ERROR  is =>'.bgRed, error);
	throw error
})

