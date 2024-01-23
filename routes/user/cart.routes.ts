
import express from 'express';

const cartRoutes=express.Router();
import mongoose from 'mongoose';
import {addNewCart,getCart,getAllCart,updateCart, deleteCart,deleteAllCart} from '../../controller/user/cart.controller'
import { verifyToken } from '../../helper/verifyToken';
import { verifyUser } from '../../helper/verifyUser';
cartRoutes.post('/add-cart',verifyUser,verifyToken,addNewCart);
cartRoutes.get('/get-all-carts',verifyUser,verifyToken,getAllCart);
cartRoutes.get('/get-cart/:id',verifyUser,verifyToken,getCart);
cartRoutes.put('/update-cart/:id',verifyUser,verifyUser,verifyToken,updateCart);
cartRoutes.delete('/del-cart/:id',verifyUser,verifyToken,deleteCart);
cartRoutes.delete('/del-all',verifyUser,verifyToken,deleteAllCart);



export default cartRoutes;