import mongoose from 'mongoose';
import { IUser } from '../Interface/userInterface';
import UserCollection from "../schema/userSchema";
import { Request, Response } from "express";
export default class UserServices {
    getUser=async (body: Record<string, any>)=>{
       return await UserCollection.findOne(body);
    }
    addNewUser=async (body: Record<string, any>)=>{
        return await UserCollection.create(body);
    }
    getUserById=async (id:Promise<IUser | null>) =>{
        return await UserCollection.findById(id)
    }
    getUsers=async (query: Record<string, any>)=>{
        return await UserCollection.find(query)
    }
    updateUser=async (id:string,body:Record<string, any>)=>{
        return await UserCollection.findByIdAndUpdate(id,{$set:body},{new:true});
    }
}