import { Request, Response } from 'express';
import ReviewServices from '../../services/reviewServices';
const reviewServices = new ReviewServices();

export const getReview = async (req: Request, res: Response) => {
  try {
    const review = await reviewServices.getReview({
      _id: req.params.id,
      isDelete: false,
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllReview = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewServices.getAllReviews({ isDelete: false });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
