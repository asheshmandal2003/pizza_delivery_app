import Razorpay from "razorpay";

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
    await instance.orders.create(options, function (err, order) {
      if (err) console.log(err);
      res.status(201).json(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const paymentVerification = (req, res) => {
  try {
    res.status(201).redirect("http://localhost:3000/pizza");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
