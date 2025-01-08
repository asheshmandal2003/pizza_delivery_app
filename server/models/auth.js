import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  pageType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
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

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

authSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// authSchema.statics.hashExistingPasswords = async function () {
//   const users = await this.find({});
//   for (const user of users) {
//     if (!user.password.startsWith("$2b$")) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(user.password, salt);
//       await user.save();
//     }
//   }
// };

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
