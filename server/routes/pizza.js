import express from "express";
import {
  createPizza,
  deletePizza,
  showCreatedPizzas,
} from "../controllers/pizza.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/create-pizza", verifyToken, createPizza);
router.get("/:id/pizzas", verifyToken, showCreatedPizzas);
router.delete("/:id/pizzas/:pizzaId", verifyToken, deletePizza);

export default router;
