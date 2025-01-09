import express from "express";
import {
  cancel,
  deleteOrder,
  delivered,
  orders,
  outForDelivery,
} from "../controllers/orders.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/orders", verifyToken, orders);
router.delete("/:id/orders/:orderId", verifyToken, deleteOrder);
router.patch("/orders/:orderId/outForDelivery", verifyToken, outForDelivery);
router.patch("/orders/:orderId/delivered", verifyToken, delivered);
router.patch("/orders/:orderId/cancel", verifyToken, cancel);

export default router;
