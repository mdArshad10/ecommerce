import mongoose from 'mongoose'
import { DB_Name,mongodbURL } from '../constent.js'

export const connectionDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${mongodbURL}/${DB_Name}`)
        // console.log(connectionInstance);
        console.log(`the db connection has been done successfully at ${connectionInstance.connection.port}`.bgGreen);
    } catch (error) {
        console.log("the error in db is =>".bgRed, error);
        process.exit(1)
    }
}