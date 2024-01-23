import mongoose from 'mongoose'
export interface IProduct 
{
    _id?:string;
    title:string;
    desc:string;
    price:Number;
    category:string;
    isDelete?:boolean;
    avgRating:Number;
    image?:string;

}