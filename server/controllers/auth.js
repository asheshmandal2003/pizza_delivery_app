import Auth from "../models/auth.js";

export const signup = async (req, res, next) => {
  try {
    const newUser = new Auth(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
