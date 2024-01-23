import  express from "express";
const cartRoutes=express.Router();
import mongoose from "mongoose";
import {getCart,getAllCart}from '../../controller/admin/cart.controller';
import { verifyToken } from "../../helper/verifyToken";
import { verifyAdmin } from "../../helper/verifyAdmin";

cartRoutes.get('/get-all-carts',verifyAdmin,verifyToken,getAllCart);
cartRoutes.get('/get-cart/:id',verifyAdmin,verifyToken,getCart);

export default cartRoutes;