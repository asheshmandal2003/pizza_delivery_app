import Auth from "../models/auth.js";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email doesn't exist!" });
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    await sendMail(
      email,
      "Password Reset Request",
      `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto;">
        <h2 style="text-align: center; color: #4caf50;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
        <p>To reset your password, click the link below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${
            process.env.FRONTEND_URL
          }/reset-password?token=${resetToken}" style="font-size: 16px; color: #fff; background-color: #4caf50; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
        <p>If you have any issues, please contact support.</p>
        <p>Thank you,<br>Ashesh Mandal</p>
        <footer style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
          © ${new Date().getFullYear()} asheshmandal2k3@gmail.com. All rights reserved.
        </footer>
      </div>
      `
    );

    return res.status(200).json({ message: "Password reset link sent!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, confirmPassword } = req.body;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await Auth.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.password = await hashPassword(confirmPassword);
    await user.save();

    return res.status(200).json({ message: "Password successfully reset!" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid or expired token!" });
  }
};
