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
  pageType: {
    type: String,
    enum: ["user", "admin"],
  },
  location: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  pizzas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pizza",
    },
  ],
});

authSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
