import mongoose from 'mongoose';
// import { IProduct } from '../interface/productInterface';
import productCollection from "../schema/productSchema";

export default class productService{
    addNewProduct=async (body:Record<string, any>)=>{
        return await productCollection.create(body);
}
getProduct=async (body:Record<string, any>)=>{
  return await productCollection.findOne(body)
}
getProductById=async (id:Record<string, any>)=>{
  return await productCollection.findById(id)
}
getProducts=async (query:Record<string, any>)=>{
  return await productCollection.find(query)
}
updateProduct=async (id:Record<string, any>,body:Record<string, any>)=>{
  return await productCollection.findByIdAndUpdate(id,{$set:body},{new:true});
}
}