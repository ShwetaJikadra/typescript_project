import mongoose from 'mongoose';
import { IReview } from '../Interface/reviewInterface';
const reviewSchema=new mongoose.Schema<IReview>({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'products',
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
   
}, {timestamps: true});






// module.exports = mongoose.model<IReview>('review', reviewSchema);


const ReviewCollection=mongoose.model<IReview>('review',reviewSchema)
export default ReviewCollection