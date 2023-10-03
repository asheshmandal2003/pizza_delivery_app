import express from "express";
import {
  createPizza,
  deletePizza,
  showCreatedPizzas,
} from "../controllers/pizza.js";

const router = express.Router();

router.post("/:id/create-pizza", createPizza);
router.get("/:id/pizzas", showCreatedPizzas);
router.delete("/:id/pizzas/:pizzaId", deletePizza);

export default router;
