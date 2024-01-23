import express from 'express';
import mongoose from 'mongoose';
import { IFavourite } from '../../Interface/favouriteInterface';
import { IProduct } from '../../Interface/productInterface';
import { IUser } from '../../Interface/userInterface';
import OrderServices from '../../services/orderServices';
const orderServices=new OrderServices()
import FavouriteServices from '../../services/favouriteServices';
const favouriteServices=new FavouriteServices();
import ProductService from '../../services/productServices';
const productServices = new ProductService();
import { Response,Request } from 'express';
import FavouriteCollection from '../../schema/favouriteSchema';

export const addInFavourite=async (req:Request,res:Response)=>{
    const pid:any =req.body;
    if (!req.user || !req.user._id) {
        return res.json({ message: 'User not authenticated' });
    }
    let product:any=await productServices.getProduct({item:pid,isDelete:false});
    if(!product)
    {
        return res.json({message:'this item not available'})
    }

    
    product=await favouriteServices.addNewFavourite({user:req.user._id,item:pid});
    product.save();
    res.json({message:'product added in favourite success'});
}

export const deleteFromFavourite=async (req:Request,res:Response)=>{
    const {pid}=req.body;
    let favourite:any=await favouriteServices.getFavourite({item:pid,isDelete:false});
    if(!favourite)
    {
        return res.json({message:'this  not available in favourite list'})
    }


    favourite=await FavouriteCollection.findOneAndUpdate(favourite._id,{isDelete:true},{new:true})
    favourite.save();
    res.json({message:'product deleted in favourite success'});

}