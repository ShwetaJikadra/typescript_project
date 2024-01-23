import { Request, Response } from 'express';
import { IOrder } from '../../Interface/orderInterface';
import OrderServices from '../../services/orderServices';
import orderCollection from '../../schema/orderSchema';

const orderServices = new OrderServices();

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    // Retrieve all orders
    const orders = await orderCollection.find().populate('user');

    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const orderId:any = req.params.id;

  try {
 
    const order = await orderServices.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const orderId :any = req.params.id;
  const { status } = req.body;

  try {
    const order :any = await orderServices.getOrderById(orderId);
    console.log(order);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;

    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
