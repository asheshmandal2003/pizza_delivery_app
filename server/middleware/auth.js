import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send({ message: "Access denied!" });

    if (token.startsWith("Bearer ")) token = token.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Invalid or expired token!" });
      }
      next();
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};
