import express from "express";
import { userDetails } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", userDetails);

export default router;
