import mongoose from 'mongoose'
import { IFavourite } from '../Interface/favouriteInterface';
const favouriteSchema=new mongoose.Schema<IFavourite>({
    user:{
       type:mongoose.Schema.ObjectId,
       ref:'users'
    },
    item:{
        type:mongoose.Schema.ObjectId,
        ref:'products'
    },
    isDelete:{
     type:Boolean,
     default:false
    }
},{timestamps: true});
module.exports = mongoose.model<IFavourite>('favourite', favouriteSchema);
const FavouriteCollection=mongoose.model<IFavourite>('favourite',favouriteSchema)
export default FavouriteCollection