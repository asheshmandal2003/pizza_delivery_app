import Auth from "../models/auth.js";
import { Token } from "../models/token.js";
import crypto from "crypto";
import { sendMail } from "../utils/sendMail.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new Auth({ name, email });
  try {
    const registeredUser = await Auth.register(newUser, password);
    req.logIn(registeredUser, async (err) => {
      if (err) return err;
      const token = new Token({
        userId: registeredUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
      const url = `http://localhost:3000/auth/${registeredUser._id}/verify/${token.token}`;
      await sendMail(req.body.email, "Verify Token", url);
      res.status(201).json(registeredUser);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signin = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

export const emailVerification = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.params.id);
    const token = await Token.findOne({
      userId: req.params.id,
      token: req.params.token,
    });
    if (user && token) {
      res.status(200).json({ message: "Verification Done!" });
    } else {
      res.status(400).send({ message: "Invalid link" });
    }
    console.log("Happy Happy Happy");
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
