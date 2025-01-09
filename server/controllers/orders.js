import Auth from "../models/auth.js";
import { Order } from "../models/orders.js";

export const orders = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id).select(
      "name location email pageType orders"
    );
    const populateOrders = await user.populate("orders");
    res.status(200).json(populateOrders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteOrder = async (req, res) => {
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

export const outForDelivery = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderId, {
      status: "Order outs for delivery",
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const delivered = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderId, {
      status: "Order delivered",
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const cancel = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderId, {
      status: "Order cancelled",
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
