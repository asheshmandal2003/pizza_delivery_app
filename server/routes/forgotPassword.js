import express from "express";
import { checkEmail, resetPassword } from "../controllers/forgotPassword.js";

const router = express.Router();

router.post("/", checkEmail);
router.post("/users/:id/reset-password", resetPassword);

export default router;
