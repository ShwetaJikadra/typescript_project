import  express from 'express';
const admin:any = express.Router();
import adminRoutes from "../../routes/admin/admin.routes";
import productRoutes from './product.routes';
import cartRoutes from './cart.routes';
// import orderRoutes from '../../routes/admin/order.routes'

import { verifyToken } from '../../helper/verifyToken';
import { verifyAdmin } from '../../helper/verifyAdmin';
import orderRoutes from './order.routes';
import reviewRoutes from './review.routes';

admin.use('/user',adminRoutes)
admin.use('/product',verifyToken,verifyAdmin,productRoutes)
admin.use('/cart',verifyToken,verifyAdmin,cartRoutes)
admin.use('/order',verifyToken,verifyAdmin,orderRoutes)
admin.use('/review',verifyAdmin,verifyToken,reviewRoutes)


export default admin; 
