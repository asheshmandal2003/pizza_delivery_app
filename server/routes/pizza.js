import express from "express";
import { createPizza } from "../controllers/pizza.js";

const router = express.Router();

router.post("/create-pizza", createPizza);

export default router;
