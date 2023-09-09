import mongoose from "mongoose";
const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  token: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

export const Token = mongoose.model("Token", tokenSchema);
