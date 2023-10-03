import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_name: String,
  order_from: String,
  order_email: String,
  order_id: String,
  order_time: Date,
  status: {
    type: String,
    enum: [
      "Order not placed",
      "Order placed",
      "Order outs for delivery",
      "Order delivered",
      "Order cancelled",
    ],
    default: "Order not placed",
  },
});

export const Order = mongoose.model("Order", orderSchema);
