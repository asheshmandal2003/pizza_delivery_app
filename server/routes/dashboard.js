import express from "express";
import { dashboard, updateDashboard } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/:id/dashboard", dashboard);
router.put("/dashboard/update", updateDashboard);

export default router;
