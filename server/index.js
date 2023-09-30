import express from "express";
import dotenv from "dotenv";
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

const app = express();
dotenv.config();
const PORT = process.env.PORT || 9000;
const sessionOptions = {
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

app.use(cors({ origin: "http://localhost:3000" }));
app.use(session(sessionOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(Auth.createStrategy());
passport.serializeUser(Auth.serializeUser());
passport.deserializeUser(Auth.deserializeUser());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/forgot-password", forgotPassRoute);
app.use("/pizza", pizzaRoute);
app.use("/pizza", dashboardRoute);
app.use("/pizza", paymentRoute);
app.use("/pizza", ordersRoute);
app.get("/pizzas", pizzas);

mongoose
  .connect("mongodb://127.0.0.1:27017/pizza")
  .then(() =>
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
