import Auth from "../models/auth.js";
import { Token } from "../models/token.js";
import crypto from "crypto";
import { sendMail } from "../utils/sendMail.js";
import { Dashboard } from "../models/dashboard.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, location, email, password, pageType } = req.body;
  const newUser = new Auth({
    name,
    location,
    email,
    pageType,
  });
  try {
    const registeredUser = await Auth.register(newUser, password);
    req.logIn(registeredUser, async (err) => {
      if (err) return err;
      if (pageType === "admin") {
        const newDashboard = new Dashboard();
        newDashboard.author = registeredUser._id;
        await newDashboard.save();
      }
      const token = new Token({
        userId: registeredUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
      const url = `${process.env.FRONTEND_URL}/auth/${registeredUser._id}/verify/${token.token}`;
      await sendMail(req.body.email, "Verify Token", url);
      res.status(201).json(registeredUser);
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong :(" });
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).send({ message: "Invalid Username and Password!" });
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
      await Auth.deleteOne({ _id: req.params.id });
      res.status(400).send({ message: "Invalid link" });
    }
  } catch (error) {
    await Auth.deleteOne(user);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const resendEmail = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.params.id);
    const token = new Token({
      userId: req.params.id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await token.save();
    const url = `${process.env.FRONTEND_URL}/auth/${req.params.id}/verify/${token.token}`;
    await sendMail(user.email, "Verify Token", url);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error!" });
  }
};
