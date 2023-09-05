import Auth from "../models/auth.js";

export const userDetails = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
