import mongoose from "mongoose";
const { Schema } = mongoose;

const otpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

export const Otp = mongoose.model("Otp", otpSchema);
