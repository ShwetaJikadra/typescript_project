import mongoose from 'mongoose'
export interface IFavourite {

_id?:string;
user:mongoose.Schema.Types.ObjectId;
item:mongoose.Schema.Types.ObjectId;
isDelete:boolean;
createdAt?: string;
updatedAt?: string;
}