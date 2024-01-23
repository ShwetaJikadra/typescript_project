import express from 'express'

const reviewRoutes=express.Router();

import {getReview,getAllReview} from '../../controller/admin/review.controller';
const { verifyAdmin } = require('../../helper/verifyAdmin');

reviewRoutes.get('/get-review/:id',verifyAdmin,getReview);
reviewRoutes.get('/get-all-review',verifyAdmin,getAllReview);
export default reviewRoutes;