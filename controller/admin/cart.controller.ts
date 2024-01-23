
import express from 'express';
import mongoose from 'mongoose';
import { ICart } from '../../Interface/cartInterface';

import { Request, Response } from 'express';
import { IUser } from '../../Interface/userInterface';
import CartServices from '../../services/cartServices';
const cartServices=new CartServices();
import ProductServices from '../../services/productServices';
import CartCollection from '../../schema/cartSchema';
import ProductCollection from '../../schema/productSchema';
const productServices=new ProductServices();

export const getCart = async (req:Request, res:Response):Promise<void>=> {
    try {
      let id:any = req.params.id;
      let cartItem = await cartServices.getCartById(id);
      if (!cartItem) {
        res.json({ message: "cart not found" });
      }
      else{
      res.status(500).json(cartItem);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal server Error" });
    }
  };

  export const getAllCart = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id;
  
      
      const carts: any[] = await CartCollection.find({ isDelete: false }).lean().exec();
  
      
      const cartItemIds = carts.map((cart) => cart.cartItem);
  
     
      const cartItemsDetails = await Promise.all(
        cartItemIds.map(async (cartItemId) => {
          // Fetch details for a single cartItem
          return await ProductCollection.findById(cartItemId).lean().exec();
        })
      );
  
      // Combine the cart details with the cartItems
      const result = carts.map((cart) => ({
        ...cart,
        cartItem: cartItemsDetails.find((item:any) => String(item._id) === String(cart.cartItem)),
      }));
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching user\'s cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

