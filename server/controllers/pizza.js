import Auth from "../models/auth.js";
import { Pizza } from "../models/pizza.js";

export const createPizza = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    const { name, pizzaBase, sauce, cheese, veggies } = req.body;
    const newPizza = new Pizza({ name, pizzaBase, sauce, cheese });
    const allVeggies = JSON.parse(veggies);
    allVeggies.map((veggie) => newPizza.veggies.push(veggie));
    user.pizzas.push(newPizza);
    await newPizza.save();
    await user.save();
    res.status(201).json(newPizza);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const showCreatedPizzas = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    const populatePizza = await user.populate("pizzas");
    res.status(200).json(populatePizza);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deletePizza = async (req, res) => {
  try {
    await Auth.findByIdAndUpdate(req.params.id, {
      $pull: { pizzas: req.params.pizzaId },
    });
    await Pizza.findByIdAndDelete(req.params.pizzaId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
