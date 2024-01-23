import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserServices from '../../services/userServices'; 
import * as jwt from 'jsonwebtoken'
import { IUser } from '../../Interface/userInterface';
import UserCollection from '../../schema/userSchema';
import * as randomstring from 'randomstring'

const userServices = new UserServices();

declare module 'express' {
  interface Request {
    user?: IUser; 
  }
}


export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      let id:any = req.params.id;
      let user: IUser | null = await userServices.getUserById(id);
  
      if (!user) {
        res.json({ message: "user not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
     
    }
  };

  export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
      let users = await UserCollection.find({ isDelete: false });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const signOut = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = jwt.sign({ userId: req.user?._id }, process.env.SECRET_KEY || '', { expiresIn: '5s' });
  
      console.log('User signed out');
      return res.status(200).json({ message: 'User signed out successfully', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };