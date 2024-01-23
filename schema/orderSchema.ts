import mongoose from 'mongoose';
import { IOrder } from '../Interface/orderInterface';

const orderSchema = new mongoose.Schema<IOrder>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
      required: true,
    },
    items:[{
      cartItem:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'products'
      },
        quantity: {
          type: Number,
          default: 1,
        },
        price:{
          type:Number
        }
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      fullname: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },{timestamps: true});
  
//   module.exports = mongoose.model<IOrder>('order', orderSchema);
  const orderCollection=mongoose.model<IOrder>('order',orderSchema);
  export default orderCollection;