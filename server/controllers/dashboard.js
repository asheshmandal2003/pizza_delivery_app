import { Dashboard } from "../models/dashboard.js";

export const dashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.find({});
    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateDashboard = async (req, res) => {
  try {
    const newDasboard = new Dashboard(req.body);
    await newDasboard.save();
    res.status(201).json(newDasboard);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
