import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const authSchema = new Schema({
  name: String,
  email: String,
  password: String,
  verified: {
    type: Boolean,
    default: false,
  },
});

authSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
