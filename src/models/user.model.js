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
        // required:[true,'plz add the addresss']
    },
})

// pre are hook present in mongoose
// and it is a middleware so we pass next as argumnet
// it is make my password hash
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// we inject the our own method in userSchema for checking the password
userSchema.methods.isMatchPassword = async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword, this.password)
}

export const User = mongoose.model('User', userSchema);
