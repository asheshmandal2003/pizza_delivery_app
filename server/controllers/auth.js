import Auth from "../models/auth.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new Auth({ name, email });
  try {
    const registeredUser = await Auth.register(newUser, password);
    req.logIn(registeredUser, (err) => {
      if (err) return err;
      res.status(201).json(registeredUser);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signin = async (req, res, next) => {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
