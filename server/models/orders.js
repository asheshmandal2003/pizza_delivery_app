import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_name: String,
  order_from: String,
  order_email: String,
  order_id: String,
  order_time: Date,
  order_location: String,
  status: {
    type: String,
    enum: [
      "Order placed",
      "Order outs for delivery",
      "Order delivered",
      "Order cancelled",
    ],
    default: "Order placed",
  },
});

export const Order = mongoose.model("Order", orderSchema);
