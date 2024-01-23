import express from 'express'
import { Request,Response } from 'express'
import { IProduct } from '../../Interface/productInterface'
import ProductCollection from '../../schema/productSchema'
import mongoose from 'mongoose'
     



const app = express();
import ProductService from '../../services/productServices'

const productServices =new ProductService();
export const addNewProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    
    
    const { title, desc, price, category,image } = req.body;
  
   
    let product = await productServices.getProduct({
      title: title,
      isDelete: false,
    });

    if (product) {
      res.json({ message: "Product already exists" });
      return; 
    }
   

    product = await ProductCollection.create({
      title: title,
      desc: desc,
      price: price,
      category: category,
    
    });
    if (req.file) {
      product.image = req.file.path;
    }

    
    await product.save();

    res.json({ product, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


  

  export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      let id: any = req.params.id;
      let product :any= await productServices.getProductById(id);
  
      if (!product) {
        res.json({ message: "Product not found" });
      } else {
        product = await productServices.updateProduct(
          product?._id,
          { isDelete: true },
        );
  
        if (product) {
          product.save();
          res.json({ message: "Product is deleted", product });
        } else {
          res.json({ message: "Failed to delete product" });
        }
      }
    } catch (error) {
      console.error("Internal Server Error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      let id: any = req.params.id;
      let product:any = await productServices.getProduct({
        _id: id,
        isDelete: false,
      });
  
      if (!product) {
         res.json({ message: "Product not found" });
      }
      else{
  
      product = await productServices.updateProduct(
        id,
        { ...req.body },
      
      );
      if (req.file) {
        product.image = req.file.path;
      }
      product.save();
     
    } 
  
      console.log(product);
      res.json({ message: "Product is updated", product });
      }
    catch (error) {
      console.error(error);
      res.json({ message: "Internal Server Error" });
    }
  };

  export const getByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      let category = req.query.category;
      let products = await productServices.getProducts({
        category: category,
        isDelete: false,
      });
  
      if (products.length === 0) {
         res.json({ message: "No product found in this category" });
      }
      else{
  
      res.json({ message: "Found results", products: products });
      }
    } catch (error) {
      console.error("Internal Server Error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };