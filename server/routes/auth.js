import passport from "passport";
import {
  emailVerification,
  resendEmail,
  signin,
  signup,
} from "../controllers/auth.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", passport.authenticate("local"), signin);
router.get("/users/:id/verify/:token", emailVerification);
router.post("/resend/:id", resendEmail);

export default router;
