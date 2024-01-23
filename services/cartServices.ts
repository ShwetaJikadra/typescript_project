import mongoose from 'mongoose';

import { ICart } from '../Interface/cartInterface';
import CartCollection from "../schema/cartSchema"
 export default class CartServices
 {
    addNewCart=async (body:Record<string, any>)=>{
    return await CartCollection.create(body)
    }
    getCart=async (body:any)=>{
        return await CartCollection.findOne(body)
    }
    getCartById=async (id:Record<string, any>)=>{
       return await CartCollection.findById(id)
    }
    getcarts=async (query:Record<string, any>)=>{
       return await CartCollection.find(query);
    }
    updateCart=async (id:Record<string,any>,body:Record<string, any>)=>{
        return await CartCollection.findByIdAndUpdate(id,{$set:body},{new:true})
    }
    
 }
