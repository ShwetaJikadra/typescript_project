import express from 'express'
import { Request,Response } from 'express'
import { IProduct } from '../../Interface/productInterface'
import ProductCollection from '../../schema/productSchema'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express();

import ProductService from '../../services/productServices'
const productServices =new ProductService();
import OrderServices from '../../services/orderServices';
const orderServices =new OrderServices();

export const getProduct = async (req:Request, res:Response):Promise<void> => {
    try {
      let id:any = req.params.id;
      let product = await productServices.getProductById(id);
      if (!product) {
         res.json({ message: "product not found" });
      }
      else{
      res.json(product);
      }
    } catch (error) {
      console.log("Internal server Error");
    }
  };

  export const getByCategory = async (req:Request, res:Response):Promise<void> => {
    let cat = req.query.category;
    let product = await productServices.getProducts({
      isDelete: false,
      category: cat,
    });
    if (!product) {
    res.json({ message: "not any product in this category" });
    }
    else
    {
    res.json(product);
    }
  };

  export const getAllProduct = async (req:Request, res:Response):Promise<void> => {
    try {
      let product = await ProductCollection.find();
      if (!product) {
        res.json({ message: "no awailable any products" });
      }
      else
      {
      res.json(product);
      }
    } catch (error) {
      console.log("Internal server Error");
    }
  };
  export const getPopularProduct = async (req:Request, res:Response) : Promise<Response>=> {
    try {
      const popularProducts = await ProductCollection.find({})
        .sort({ avgRating: -1 })
        .limit(10);
  
      return res.status(200).json({ products: popularProducts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const searchProduct = async (req:Request, res:Response) : Promise<Response>=> {
    try {
      const query:any= req.query;
  
      if (!query) {
        return res.status(400).json({ error: "please search any query enter" });
      }
  
      const searchQuery = {
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { desc: { $regex: new RegExp(query, "i") } },
          { category: { $regex: new RegExp(query, "i") } },
        ],
      };
  
      const searchResults = await productServices.getProduct(searchQuery);
  
      return res.status(200).json({ products: searchResults });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  