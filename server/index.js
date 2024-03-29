import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import pizzas from "./pizzas.js";
import authRoute from "./routes/auth.js";
import session from "express-session";
import passport from "passport";
import Auth from "./models/auth.js";
import userRoute from "./routes/user.js";
import forgotPassRoute from "./routes/forgotPassword.js";
import pizzaRoute from "./routes/pizza.js";
import dashboardRoute from "./routes/dashboard.js";
import paymentRoute from "./routes/payment.js";
import ordersRoute from "./routes/orders.js";
import { verifyToken } from "./middleware/auth.js";
import MongoStore from "connect-mongo";
import helmet from "helmet";

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log(res.ConnectionStates.connected))
  .catch((err) => console.log(err));

const app = express();
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const PORT = process.env.PORT || 9000;
const store = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  touchAfter: 24 * 3600,
});
store.on("error", (err) => {
  console.log("Error->", err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  name: "session",
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(cors({ origin: `${process.env.FRONTEND_URL}` }));
app.use(session(sessionOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(Auth.createStrategy());
passport.serializeUser(Auth.serializeUser());
passport.deserializeUser(Auth.deserializeUser());
app.use(helmet());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/forgot-password", forgotPassRoute);
app.use("/pizza/users", pizzaRoute);
app.use("/pizza", dashboardRoute);
app.use("/pizza/users", paymentRoute);
app.use("/pizza", ordersRoute);
app.get("/pizzas", verifyToken, pizzas);

mongoose;
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
