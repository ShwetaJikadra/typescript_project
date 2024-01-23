import express from 'express';
const reviewRoutes=express.Router();
import {addNewReview,otherReview,myReview,updateReview,deleteReview} from '../../controller/user/review.controller';
import { verifyToken } from '../../helper/verifyToken';
import { verifyUser } from '../../helper/verifyUser';



reviewRoutes.post('/add-review',verifyUser,verifyToken,addNewReview);
reviewRoutes.get('/my-review',verifyUser,verifyToken,myReview);
reviewRoutes.put('/update-review/:id',verifyUser,verifyToken,updateReview);
reviewRoutes.delete('/del-review/:id',verifyUser,verifyToken,deleteReview);
reviewRoutes.get('/other-review',verifyUser,verifyToken,otherReview)
export default reviewRoutes;

