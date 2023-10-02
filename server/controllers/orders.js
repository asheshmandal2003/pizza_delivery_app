import Auth from "../models/auth.js";
import { Order } from "../models/orders.js";

export const orders = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    const user_orders = await user.populate("orders");
    res.status(200).json(user_orders.orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    await Auth.findByIdAndUpdate(req.params.id, {
      $pull: { orders: req.params.orderId },
    });
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
