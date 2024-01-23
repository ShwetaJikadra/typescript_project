import mongoose from 'mongoose';
import { IOrder } from '../Interface/orderInterface';
import orderCollection from '../schema/orderSchema';

export default class OrderServices{
    addNewOrder=async (body:Record<string, any>)=>{
        return await orderCollection.create(body);
    }
    getOrder=async (body:Record<string, any>)=>{
        return await orderCollection.findOne(body);
    }
    getOrderById=async (id:Record<string, any>)=>{
        return  await orderCollection.findById(id);
    }
    updateOrder=async (id:Record<string, any>,body:Record<string, any>)=>{
        return await orderCollection.findByIdAndUpdate(id,{$set:body},{new:true});
    }
}