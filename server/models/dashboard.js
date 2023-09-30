import mongoose, { Schema } from "mongoose";

const dashboardSchema = new mongoose.Schema({
  pizzaBase: {
    type: Number,
    default: 21,
  },
  sauce: {
    type: Number,
    default: 21,
  },
  cheese: {
    type: Number,
    default: 21,
  },
  veggies: {
    type: Number,
    default: 21,
  },
  meat: {
    type: Number,
    default: 21,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
});

export const Dashboard = mongoose.model("Dashboard", dashboardSchema);
