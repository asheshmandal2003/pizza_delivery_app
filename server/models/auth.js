import mongoose from "mongoose";

const { Schema } = mongoose;

const authSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
