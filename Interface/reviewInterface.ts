import mongoose from 'mongoose'
export interface IReview{
       _id?:string;
       user:mongoose.Schema.Types.ObjectId;
       review:string;
       item:mongoose.Schema.Types.ObjectId;
       rating:Number;
       isDelete?:boolean;
       datePosted?:Date;

}

