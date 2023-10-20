import express from "express";
import { checkout, paymentVerification } from "../controllers/payment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/checkout", verifyToken, checkout);
router.post("/:id/pizzas/:pizzaId/order/:orderId", paymentVerification);

export default router;
