import mongoose from "mongoose";

const { Schema } = mongoose;

const pizzaSchema = new Schema({
  pizzaBase: String,
  sauce: String,
  cheese: String,
  veggies: [],
});

export const Pizza = mongoose.model("Pizza", pizzaSchema);
