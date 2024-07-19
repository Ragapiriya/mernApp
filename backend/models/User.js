//this file contains the schema of User

import mongoose from "mongoose";
const UserSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number,
    },
    {timestamps:true} //it gives when the obj is created/updated data
)
const User = mongoose.model("User",UserSchema); //creating a model
module.exports = User;