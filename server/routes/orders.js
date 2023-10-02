import express from "express";
import { cancelOrder, orders } from "../controllers/orders.js";

const router = express.Router();

router.get("/:id/orders", orders);
router.delete("/:id/orders/:orderId", cancelOrder);

export default router;
