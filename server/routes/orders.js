import express from "express";
import {
  cancel,
  deleteOrder,
  delivered,
  orders,
  outForDelivery,
  placeOrder,
} from "../controllers/orders.js";

const router = express.Router();

router.get("/:id/orders", orders);
router.delete("/:id/orders/:orderId", deleteOrder);
router.patch("/orders/:orderId/place", placeOrder);
router.patch("/orders/:orderId/outForDelivery", outForDelivery);
router.patch("/orders/:orderId/delivered", delivered);
router.patch("/orders/:orderId/cancel", cancel);

export default router;
