import Auth from "../models/auth.js";
import { Otp } from "../models/otp.js";
import { sendMail } from "../utils/sendMail.js";

export const checkEmail = async (req, res, next) => {
  try {
    const user = await Auth.findOne({ email: req.body.email });
    if (user) {
      const otp = Math.floor(Math.random() * 9000) + 1000;
      const strOtp = otp.toString();
      const newOtp = new Otp({
        userId: user._id,
        otp: strOtp,
      });
      await newOtp.save();
      await sendMail(req.body.email, "OTP Verification", strOtp);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Email doesn't exist!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};

export const matchOtp = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (user) {
      const otp = await Otp.findOne({ userId: req.params.id });
      if (otp.otp === req.body.otp) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: "Invalid OTP!" });
      }
    } else {
      res.status(404).json({ message: "User doesn't exist!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const resetPass = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (user) {
      user.setPassword(req.body.confirmPassword, () => {
        user.save();
        res.status(201).json(user);
      });
    } else {
      res.status(404).json("User doesn't exist!");
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
