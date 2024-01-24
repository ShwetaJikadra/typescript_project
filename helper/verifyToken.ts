import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { IUser } from '../Interface/userInterface';
import UserCollection from "../schema/userSchema";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: IUser; // Add the 'user' property
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  let secretKey: string | undefined | any = process.env.SECRET_KEY;
  let token: string | undefined = authorizationHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, secretKey);
    const userId: string = decoded.userId; // Assuming 'userId' is the key in the JWT payload

    console.log(userId);

    const user: IUser | null = await UserCollection.findById(userId) || null;

    if (user !== null) {
      req.user = user;
      next();
    } else {
      res.json({ message: "User Invalid" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
