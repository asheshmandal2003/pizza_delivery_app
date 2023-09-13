import { Pizza } from "../models/pizza.js";

export const createPizza = async (req, res) => {
  try {
    const { pizzaBase, sauce, cheese, veggies } = req.body;
    const newPizza = new Pizza({ pizzaBase, sauce, cheese });
    const allVeggies = JSON.parse(veggies);
    allVeggies.map((veggie) => newPizza.veggies.push(veggie));
    await newPizza.save();
    res.status(201).json(newPizza);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
