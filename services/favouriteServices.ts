import mongoose from 'mongoose';
import { IFavourite } from '../Interface/favouriteInterface';
import FavouriteCollection  from '../schema/favouriteSchema';

 export default class favouriteServices{
    addNewFavourite=async (body:Record<string,any>)=>{
        return await FavouriteCollection.create(body);
    }
    getFavourite=async (body:Record<string,any>)=>{
        return await FavouriteCollection.find(body);
    }
    getFavouriteById=async (id:Record<string,any>)=>{
        return await FavouriteCollection.findById(id)
    }

    updateFavourite=async (id:Record<string,any>,body:Record<string,any>)=>{
        return await FavouriteCollection.findByIdAndUpdate(id,{$set:body},{new:true})
    }
 }