import Razorpay from "razorpay";
import { Order } from "../models/orders.js";
import Auth from "../models/auth.js";
import { Dashboard } from "../models/dashboard.js";
import { sendMail } from "../utils/sendMail.js";

export const checkout = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const options = {
      amount: req.body.price * 100,
      currency: "INR",
    };
    await instance.orders.create(options, async function (err, order) {
      if (err) return err;
      res.status(201).json(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    const dashboard = await Dashboard.find({});
    const author = await dashboard[0].populate("author");
    const admin = await Auth.findById(author.author._id);
    const newOrder = new Order({
      order_name: req.params.pizzaId,
      order_from: user.name,
      order_email: user.email,
      order_id: req.params.orderId,
      order_time: Date.now(),
    });
    dashboard[0].pizzaBase -= 1;
    dashboard[0].sauce -= 1;
    dashboard[0].cheese -= 1;
    dashboard[0].veggies -= 1;
    dashboard[0].meat -= 1;

    if (
      dashboard[0].pizzaBase <= 20 ||
      dashboard[0].sauce <= 20 ||
      dashboard[0].cheese <= 20 ||
      dashboard[0].veggies <= 20 ||
      dashboard[0].meat <= 20
    ) {
      await sendMail(
        author.author.email,
        "Hurry! Stock is going to be empty!",
        "Current stock has less than 20 ingredients!"
      );
    }
    user.orders.unshift(newOrder._id);
    admin.orders.unshift(newOrder._id);
    await newOrder.save();
    await user.save();
    await admin.save();
    dashboard[0].save();
    res.status(201).redirect("http://localhost:3000/pizza/orders");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
