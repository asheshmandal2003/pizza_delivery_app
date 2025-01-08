import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import pizzas from "./pizzas.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import forgotPassRoute from "./routes/forgotPassword.js";
import pizzaRoute from "./routes/pizza.js";
import dashboardRoute from "./routes/dashboard.js";
import paymentRoute from "./routes/payment.js";
import ordersRoute from "./routes/orders.js";
import { verifyToken } from "./middleware/auth.js";
import helmet from "helmet";
import morgan from "morgan";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors({ origin: `${process.env.FRONTEND_URL}` }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/forgot-password", forgotPassRoute);
app.use("/pizza/users", pizzaRoute);
app.use("/pizza", dashboardRoute);
app.use("/pizza/users", paymentRoute);
app.use("/pizza", ordersRoute);
app.get("/pizzas", verifyToken, pizzas);

function startServer() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();
