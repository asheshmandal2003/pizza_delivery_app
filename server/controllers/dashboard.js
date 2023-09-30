import { Dashboard } from "../models/dashboard.js";

export const dashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.find({ author: req.params.id });
    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateDashboard = async (req, res) => {
  try {
    await Dashboard.updateOne(req.body);
    res.status(200).json({ message: "Successfully Updated!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
