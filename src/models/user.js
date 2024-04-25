import { strict } from "assert";
import mongoose from "mongoose";
import { type } from "os";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide an username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please provide an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide an password"],
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    verifyToken:{
        type:String
    },
    verifyTokenExpiry:{
        type:String
    },
    
})


const User = mongoose.models.users ||  mongoose.model("users",userSchema);

export default User;