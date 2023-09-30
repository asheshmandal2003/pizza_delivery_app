import Auth from "../models/auth.js";

export const orders = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    const user_orders = await user.populate("orders");
    res.status(200).json(user_orders.orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
