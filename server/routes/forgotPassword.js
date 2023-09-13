import express from "express";
import {
  checkEmail,
  matchOtp,
  resetPass,
} from "../controllers/forgotPassword.js";

const router = express.Router();

router.post("/", checkEmail);
router.post("/users/:id", matchOtp);
router.post("/users/:id/reset-password", resetPass);

export default router;
