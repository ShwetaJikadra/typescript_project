import mongoose  from "mongoose";
import { ICart } from "../Interface/cartInterface";
import { IProduct } from "../Interface/productInterface";

const cartSchema = new mongoose.Schema<ICart>({
    cartItem: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    quantity: {
      type: Number,
      require: true,
      default: 1,
    },
    price:{
          type:Number,
    },
    isDelete:{
      type:Boolean,
      default:false,
    }
  });
  
  const CartCollection=mongoose.model<ICart>('carts',cartSchema)
export default CartCollection;
