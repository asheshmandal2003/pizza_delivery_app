import express from "express";
import { checkout, paymentVerification } from "../controllers/payment.js";

const router = express.Router();

router.post("/:id/checkout", checkout);
router.post("/:id/pizzas/:pizzaId/order/:orderId", paymentVerification);

export default router;
