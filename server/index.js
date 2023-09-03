import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import pizzas from "./pizzas.js";
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 9000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/auth", authRoute);
app.get("/pizzas", pizzas);

mongoose
  .connect("mongodb://127.0.0.1:27017/pizza")
  .then(() =>
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
