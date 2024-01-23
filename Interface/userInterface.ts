import mongoose from 'mongoose';
export interface IUser 
{
    _id?:string,
    fname:string,
    lname:string,
    phone:Number,
    email:string,
    password:string,
    gender:string,
    role?:string,
    isDelete?:boolean,
    createdAt?: Date;
    updatedAt?: Date;
    resetToken?:string,
    profileImage?:string;
    

}
