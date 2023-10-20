import express from "express";
import { dashboard, updateDashboard } from "../controllers/dashboard.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/dashboard", verifyToken, dashboard);
router.put("/dashboard/update", verifyToken, updateDashboard);

export default router;
