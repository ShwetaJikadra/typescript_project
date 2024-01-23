import { Request, Response } from 'express';
// import { IReview } from '../../interface/reviewInterface';
import { IProduct } from '../../Interface/productInterface';
import ReviewServices from '../../services/reviewServices';
import ProductServices from '../../services/productServices';
import ReviewCollection from '../../schema/reviewSchema';
import ProductCollection from '../../schema/productSchema';

const reviewServices = new ReviewServices();
const productServices = new ProductServices();



export const addNewReview = async (req: Request, res: Response) => {
  try {
    const { item, review, rating } = req.body;
    const userId = (req as any).user._id;

    // Check if the product is available
    const existingProduct = await productServices.getProduct({ _id:item, isDelete: false });

    if (!existingProduct) {
      console.error('Existing product not found:', item);
      return res.status(404).json({ message: 'Product is not available' });
    }

    // Check if the user has already given a review for this item
    const existingReview = await reviewServices.getReview({
      item: existingProduct._id, // Use the product ID instead of the item name
      user: userId,
      isDeleted: false,
    });

    if (existingReview) {
      console.error('Existing review found for user:', userId, 'and product:', existingProduct._id);
      return res.status(400).json({
        message: 'You have already given a review for this item',
      });
    }

    // Add a new review
    const newReview = await reviewServices.addNewReview({
      user: userId,
      item: existingProduct._id, // Use the product ID instead of the item name
      review: review,
      rating: rating,
    });

    // Calculate the average rating for the product
    const averageRatingResult = await ReviewCollection.aggregate([
      {
        $match: { item: existingProduct._id },
      },
      {
        $group: {
          _id: '$item',
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    const averageRating = averageRatingResult.length > 0 ? averageRatingResult[0].averageRating : 0;

    // Update the product with the new average rating
    await ProductCollection.updateOne(
      { _id: existingProduct._id },
      { $set: { avgRating: averageRating } }
    );

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const otherReview = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewServices.getReview({ isDelete: false });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const myReview = async (req: Request, res: Response) => {
  try {
    const review:any = await reviewServices.getReview({
      user: (req as any).user._id,
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
export const updateReview = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;
    const { review, rating } = req.body;
    const userId = (req as any).user._id;

    // Ensure that the user has given reviews
    let reviews = await reviewServices.getReview({
      user: userId,
      isDelete: false,
    });

    if (!reviews) {
      return res.json({ message: 'User has not given any review yet' });
    }

    // Update the review
    reviews = await reviewServices.updateReview(id, { review, rating });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  export const deleteReview = async (req: Request, res: Response) => {
    try {
      const id :any = req.params.id;
  
      let reviews = await reviewServices.getReview({
        user: (req as any).user._id,
        isDelete: false,
      });
  
      if (!reviews) {
        return res.json({ message: 'user has not given any review yet' });
      }
  
      const deletedReview = await reviewServices.updateReview(
        id,
        { isDelete: true },
        
      );
  
      if (!deletedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.status(200).json(deletedReview);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
