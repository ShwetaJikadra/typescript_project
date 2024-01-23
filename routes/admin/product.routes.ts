import express, { Router } from 'express';
import { verifyAdmin } from '../../helper/verifyAdmin';
import { verifyToken } from '../../helper/verifyToken';

import {addNewProduct,deleteProduct,updateProduct,getByCategory} from '../../controller/admin/product.controller'
import { handleProductImageUpload, upload2 } from '../../helper/productImageUpload';

const productRoutes:Router=express.Router();

productRoutes.post(
    "/add-new-product",
    verifyAdmin,
    upload2.single('image'), 
    handleProductImageUpload,
    addNewProduct
);

productRoutes.delete("/delete-product/:id",verifyAdmin, deleteProduct);
productRoutes.put("/update-product/:id",verifyAdmin,  upload2.single('image'), 
handleProductImageUpload, updateProduct);
productRoutes.get("/get-category",verifyAdmin,verifyToken,getByCategory);
 export default productRoutes;


