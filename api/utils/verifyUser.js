import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const verifyUser = async (req, res, next) => {
  // console.log('inhere');
  const token = req.cookies.access_token;
  if (!token) {
    // console.log('inhere2');
    return errorHandler(401, "Unauthorized");
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return errorHandler(401, "Unauthorized");
    } else {
      req.user = user;
      next();
    }
  });
};
