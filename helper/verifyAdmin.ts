import * as dotenv from 'dotenv';
dotenv.config();

import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IUser } from '../Interface/userInterface';
import UserCollection from '../schema/userSchema';

import { Request, Response, NextFunction } from 'express';

// Extend the Request type to include the 'user' property
declare module 'express' {
  interface Request {
    user?: IUser; // Add the 'user' property
  }
}

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let secretKey: string | undefined | any = process.env.SECRET_KEY;
    const authorizationHeader: any = req.headers['authorization'];
    let token: string | undefined | any = authorizationHeader.split(' ')[1];

    let { userId, role }: any = jwt.verify(token, secretKey);

    const user: IUser | null = await UserCollection.findById(userId);

    if (user !== null && user?.role === 'admin') {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ message: "Not allowed: User doesn't have the required role" });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
