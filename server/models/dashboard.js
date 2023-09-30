import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  pizzaBase: {
    type: Number,
    default: 0,
  },
  sauce: {
    type: Number,
    default: 0,
  },
  cheese: {
    type: Number,
    default: 0,
  },
  veggies: {
    type: Number,
    default: 0,
  },
  meat: {
    type: Number,
    default: 0,
  },
});

export const Dashboard = mongoose.model("Dashboard", dashboardSchema);
