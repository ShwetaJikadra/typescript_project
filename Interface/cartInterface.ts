import  mongoose from 'mongoose'
export interface ICart
{
    _id?:string;
    cartItem:mongoose.Schema.Types.ObjectId;
    user:mongoose.Schema.Types.ObjectId;
    quantity:Number;
    price:Number;
    isDelete?:boolean;
}