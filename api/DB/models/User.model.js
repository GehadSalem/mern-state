import mongoose, { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
},{ timestamps:true })


const userModel = model('User', userSchema) || mongoose.model.User

export default userModel;