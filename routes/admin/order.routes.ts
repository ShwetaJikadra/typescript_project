import express from 'express';

const orderRoutes = express.Router();
import { verifyAdmin } from '../../helper/verifyAdmin';
import {getAllOrder,getOrder, updateStatus} from '../../controller/admin/order.controller';
orderRoutes.get('/get-all-order',verifyAdmin,getAllOrder);
orderRoutes.get('/get-order/:id',verifyAdmin,getOrder);
orderRoutes.put('/order-status-update/:id',updateStatus);
export default orderRoutes;