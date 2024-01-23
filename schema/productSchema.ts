import mongoose from 'mongoose'
import { IProduct } from '../Interface/productInterface';
const productSchema=new mongoose.Schema<IProduct>({
    title:{
        type:String,
        require:true,
        unique:true,
        match: /^[a-zA-Z0-9\s]+$/
    },
    desc:{
        type:String,
        require:true,
        
        
    },
    price:{
        type:Number,
        require:true
    },

image:{
    type:String
 },

   category:{
    type:String,
    require:true,
    eval:['chair','aimchair','table','bed']
   },
   isDelete:{
    type:Boolean,
    default:false,
   },
   avgRating: {
    type: Number,
    default: 0,
  }
   
  
},{timestamps: true});



const ProductCollection=mongoose.model<IProduct>('product',productSchema)
export default ProductCollection;