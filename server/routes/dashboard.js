import express from "express";
import { dashboard, updateDashboard } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/dashboard", dashboard);
router.put("/dashboard", updateDashboard);

export default router;
