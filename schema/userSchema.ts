import mongoose from 'mongoose'
import {IUser} from '../Interface/userInterface';
const userSchema =new mongoose.Schema<IUser>({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        eval:['male','female'],
        require:true
    },
    phone:{
        type: Number,
    require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    },
    password:{
        type:String,
        require:true,
    },
    profileImage:{
        type:String
     },
     role:{
        type:String,
        eval:['admin','user'],
        default:'user'
     },
    isDelete:{
        type:Boolean,
        default:false,
    },
    resetToken: {
        type: String,
        default:""
    }
   
}, {timestamps:true});

const UserCollection=mongoose.model<IUser>('users',userSchema)
export default UserCollection;