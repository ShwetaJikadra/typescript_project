import { Request, Response } from 'express';
import { ICart } from '../../Interface/cartInterface';
import OrderServices from '../../services/orderServices';
import CartServices from '../../services/cartServices';
import CartCollection from '../../schema/cartSchema';

const cartServices = new CartServices();
const orderServices = new OrderServices();

export const addToOrder = async (req: Request, res: Response) => {
  try {
    const { fullname, address, zipcode, country, district, city } = req.body;

    const cartItems: any[] | null = await CartCollection.find({
      user: (req as any).user._id,
      isDelete: false,
    });

    console.log("Cart Items:", cartItems);

    if (!cartItems || cartItems.length === 0) {
      return res.json({ message: 'Cart is empty' });
    }

    const orderItems: any[] = cartItems.map((item: any) => {
      const price = Number(item.cartItem.price);

      if (isNaN(price)) {
       
        return {
          cartItem: item.cartItem._id,
          quantity: item.quantity,
          price: item.price, // 
        };
      }

      return {
        cartItem: item.cartItem._id,
        quantity: item.quantity,
        price: price,
      };
    });

    console.log("Order Items:", orderItems);

    const totalPrice = orderItems.reduce(
      (total: number, item: any) => (total += item.quantity * item.price),
      0
    );

    const newOrder = await orderServices.addNewOrder({
      user: (req as any).user._id,
      items: orderItems, // Removed unnecessary Number() conversion
      totalAmount: totalPrice, // Removed unnecessary Number() conversion
      shippingAddress: {
        fullname,
        address,
        zipcode,
        country,
        district,
        city,
      },
    });

    await CartCollection.updateMany({ user: (req as any).user._id }, { isDelete: true });

    res.status(201).json({ order: newOrder, message: 'Order placed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const updateShippingAddress = async (req: Request, res: Response) => {
  const { fullname, address, zipcode, country, district, city } = req.body;

  try {
    const order :any= await orderServices.getOrder({ user: (req as any).user._id, isDeleted: false });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.shippingAddress = {
      fullname: fullname,
      address: address,
      zipcode: zipcode,
      country: country,
      district: district,
      city: city,
    };

    // await order.save();

    res.status(200).json({ order, message: 'Shipping address updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order :any= await orderServices.getOrder({ user: (req as any).user._id, isDeleted: false });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDeleted = true;
    await order.save();

    res.json({ message: 'Order delete success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
