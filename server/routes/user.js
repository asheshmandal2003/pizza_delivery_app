import express from "express";
import { userDetails } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, userDetails);

export default router;
