import { Request, Response } from 'express';
import { ICart } from '../../Interface/cartInterface';
import ProductServices from '../../services/productServices';
import CartServices from '../../services/cartServices';
import CartCollection from '../../schema/cartSchema';
import { verifyToken } from '../../helper/verifyToken';
import ProductCollection from '../../schema/productSchema';
const cartServices = new CartServices();
const productServices = new ProductServices();

export const addNewCart = async (req: Request, res: Response) => {
  try {
    const { cartItem, quantity } = req.body;

    // Check if the product exists
    const product: any = await productServices.getProductById(cartItem);
  
    if (!product) {
      return res.json({ message: 'Product is not found' });
    }

    // Check if the cart item already exists for the user
    const existingCart: any = await cartServices.getCart({
      cartItem: cartItem,
      user: (req as any).user._id,
      isDelete:false
    });
    console.log(existingCart);

    if (existingCart) {
      return res.json({
        message: 'Product is already available in your cart',
      });
    }

    let price:Number = product.price;
    console.log(price);
    const newCart: any = await cartServices.addNewCart({
      cartItem: cartItem,
      user: (req as any).user._id,
      quantity: quantity,
      price:price

      
    });

    // Save the new cart
    await newCart.save();

    res.json({ message: 'Cart added successfully', cart: newCart });
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server Error' });
  }
};


export const getCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.cartId;
    const cartItem = await cartServices.getCart({ _id: id, user: (req as any).user._id });

    if (!cartItem) {
      return res.json({ message: 'This cart is not for this user' });
    }

    res.status(500).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;
    const isCart:any = await cartServices.getCart({
      _id: id,
      user: (req as any).user._id,
      isDelete: false,
    });

    if (!isCart) {
      console.log(isCart);
      return res.json({ message: 'Cart is not available for this user' });
    }

    isCart.quantity = quantity;
    isCart.save();
    res.json({ isCart, message: 'Update cart success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let cart:any = await cartServices.getCart({
      _id: id,
      user: (req as any).user._id,
      isDelete: false,
    });
    console.log(id);

    if (!cart) {
      return res.status(200).json({ message: 'User does not have any cart' });
    }

    cart = await CartCollection.findOneAndUpdate(
      { _id: id },
      {
        $set: { isDelete: true },
      },
      {
        new: true,
      }
    );

    cart.save();
    res.status(400).json({ message: 'Delete success', cart });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

export const deleteAllCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    let cart:any = await cartServices.getCart({ user: userId });

    if (!cart) {
      return res.json('No cart available for this user');
    }

    cart.isDelete = true;
    cart.save();
    res.status(200).json({ message: "All items deleted from the user's cart." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

export const getAllCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    // Find carts for the user
    const carts: any[] = await CartCollection.find({ user: userId, isDelete: false }).lean().exec();

    // Extract cartItem IDs
    const cartItemIds = carts.map((cart) => cart.cartItem);

    // Fetch details for each cartItem using separate queries
    const cartItemsDetails = await Promise.all(
      cartItemIds.map(async (cartItemId) => {
        // Fetch details for a single cartItem
        return await ProductCollection.findById(cartItemId).lean().exec();
      })
    );

    // Combine the cart details with the cartItems
    const result = carts.map((cart) => ({
      ...cart,
      cartItem: cartItemsDetails.find((item:any) => String(item._id) === String(cart.cartItem)),
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching user\'s cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
