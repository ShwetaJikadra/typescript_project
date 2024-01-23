import mongoose from 'mongoose';
export interface IOrder
{
    _id?:string;
    user:mongoose.Schema.Types.ObjectId;
    items:items;
    shippingAddress:shippingAddress[];
    isDeleted?:boolean;
    totalAmount:Number;
    createdAt?: Date;
    updatedAt?: Date;
    status:string;
}

interface items{
    _id?:string;
    cartItem:mongoose.Schema.Types.ObjectId;
    quantity:Number;
    price:Number;
}
interface shippingAddress{
    fullname:string;
    address:string;
    zipcode:Number;
    country:string;
    city:string;
    district:string;
}