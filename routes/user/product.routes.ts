import express, { Router } from 'express';
import { verifyUser } from '../../helper/verifyUser';
import { verifyToken } from '../../helper/verifyToken';

import {getByCategory,getProduct,getAllProduct,getPopularProduct,searchProduct} from '../../controller/user/product.controller'

const productRoutes:Router=express.Router();

productRoutes.get("/get-product/:id", getProduct);
productRoutes.get("/get-all-product", getAllProduct);
productRoutes.get('/category',getByCategory);
productRoutes.get('/popular-product',getPopularProduct);
productRoutes.get('/search',searchProduct);
 export default productRoutes;


