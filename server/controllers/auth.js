import Auth from "../models/auth.js";
import { Token } from "../models/token.js";
import crypto from "crypto";
import { sendMail } from "../utils/sendMail.js";
import { Dashboard } from "../models/dashboard.js";
import jwt from "jsonwebtoken";

async function sendVerificationEmail(email, user, url) {
  await sendMail(
    email,
    "Verify Your Email Address",
    `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #4caf50; text-align: center;">Welcome to Our Platform!</h2>
      <p>Hello <strong>${user}</strong>,</p>
      <p>Click the button below to verify your email and activate your account:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #4caf50; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      </div>
      <p>If you did not sign up, please ignore this email.</p>
    </div>
    `
  );
}

async function generateToken(userId) {
  const token = new Token({
    userId,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await token.save();
  return token;
}

export const signup = async (req, res) => {
  const { name, location, email, password, pageType, verified } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    const newUser = new Auth({
      name,
      location,
      email,
      password,
      pageType,
      verified,
    });

    if (newUser.pageType === "admin") {
      await newUser.save();
      const newDashboard = new Dashboard({ author: newUser._id });
      await newDashboard.save();
      return res.status(201).json({
        id: newUser._id,
        message: "Admin registered successfully!",
      });
    }

    const token = await generateToken(newUser._id);
    const url = `${process.env.FRONTEND_URL}/auth/users/${newUser._id}/verify/${token.token}`;
    await sendVerificationEmail(newUser.email, newUser.name, url);

    await newUser.save();
    res.status(201).json({
      id: newUser._id,
      message: "User registered successfully! Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Logged in successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        pageType: user.pageType,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const logout = async (req, res, next) => {
  res.status(200).json({ message: "Logged out successfully!" });
};

export const emailVerification = async (req, res) => {
  try {
    const { id, token: tokenParam } = req.params;

    const user = await Auth.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "User is already verified!" });
    }

    const token = await Token.findOne({ userId: id, token: tokenParam });
    if (!token) {
      return res.status(400).json({ message: "Invalid or expired link!" });
    }

    user.verified = true;
    await user.save();

    await token.deleteOne();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const resendEmail = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first!" });
    }

    if (user.verified) {
      return res
        .status(400)
        .json({ message: "This account is already verified." });
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
    } else {
      token.token = crypto.randomBytes(32).toString("hex");
      await token.save();
    }

    const verificationUrl = `${process.env.FRONTEND_URL}/auth/users/${user._id}/verify/${token.token}`;
    await sendVerificationEmail(user.email, user.name, verificationUrl);

    res
      .status(200)
      .json({ message: "Verification email has been resent successfully." });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
