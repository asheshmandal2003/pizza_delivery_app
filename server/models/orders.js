import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_name: String,
  order_id: String,
  order_time: {
    type: Date,
    default: Date.now(),
  },
});

export const Order = mongoose.model("Order", orderSchema);
