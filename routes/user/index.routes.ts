import express, { Router, Request, Response } from 'express';
import userRoutes from '../../routes/user/user.routes';
import productRoutes from './product.routes';
import favouriteRoutes from './favourite.routes';
import cartRoutes from './cart.routes';
import orderRoutes from '../../routes/user/order.routes';
import reviewRoutes from '../../routes/user/review.routes';
import { verifyToken } from '../../helper/verifyToken';
import { verifyUser } from '../../helper/verifyUser';

const user: Router = express.Router();


user.use('/user',userRoutes);
user.use('/product',productRoutes);
user.use('/cart',verifyUser,verifyToken,cartRoutes);
user.use('/review',verifyUser,verifyToken,reviewRoutes);
user.use('/favourite',verifyUser,verifyToken,favouriteRoutes);
user.use('/order',verifyUser,verifyToken,orderRoutes);




export default user;
