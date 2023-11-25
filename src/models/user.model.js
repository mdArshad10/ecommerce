import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "plz fill the username"]
    },
    email:{
        type:String,
        required:[true,'plz add the email'],
        uniqued:[true,"email alread exist"]
    },
    password:{
        type:String,
        required:[true,'plz add password'],
        minLength:[6,"min lenght of password is 6 characters"]
    },
    address:{
        type:String,
        required:[true,'plz add the addresss']
    },
    city:{
        type:String,
        required:[true,'plz add the city']
    },
    country:{
        type:String,
        required:[true,'plz add the Country']
    },
    phone:{
        type:Number,
        required:[true,'plz add the phone number'],
    },
    profilePic:{
        type:String, // upload through 3rd party app like cloudinary
        required:[true,'plz add the addresss']
    },
})

export const User = mongoose.model('User', userSchema);
