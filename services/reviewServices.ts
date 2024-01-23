import mongoose from 'mongoose';
import { IReview } from '../Interface/reviewInterface';
import ReviewCollection from '../schema/reviewSchema'

export default class  ReviewServices<IReview>{
    addNewReview=async (body:Record<string,any>)=>{
        return await ReviewCollection.create(body);
}
getReview=async (body:Record<string,any>)=>{
  return await ReviewCollection.findOne(body)
}
getReviewById=async (id:Record<string,any>)=>{
  return await ReviewCollection.findById(id)
}
getReviews=async (query:Record<string,any>)=>{
  return await ReviewCollection.find(query)
}
updateReview=async (id: Record<string, any>, body: Record<string, any>) => {
  try {
    return await ReviewCollection.findByIdAndUpdate(id, { $set: body }, { new: true });
  } catch (error) {
    console.error('Error updating review:', error);
    throw error; // Rethrow the error to be caught in the controller
  }
};

getAllReviews=async (body:Record<string,any>)=>{
  return await ReviewCollection.find(body)
}


}