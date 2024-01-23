import express from 'express'
const orderRoutes=express.Router();
import {addToOrder,updateShippingAddress,deleteOrder} from '../../controller/user/order.controller'
import { verifyToken } from '../../helper/verifyToken';
import { verifyUser } from '../../helper/verifyUser';

orderRoutes.post('/place-order',verifyUser,verifyToken,addToOrder);
orderRoutes.put('/update-address',verifyUser,verifyToken,updateShippingAddress);
orderRoutes.delete('/del-order',verifyUser,verifyToken,deleteOrder)



export default orderRoutes;