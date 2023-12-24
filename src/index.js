// import packages
import app from './app.js'
import colors from 'colors';
import { connectionDB } from './db/db.connection.js';
import {port} from './constent.js'


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

