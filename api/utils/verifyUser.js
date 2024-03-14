import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const verifyUser = async (req, res, next) => {
  // console.log("inhere");
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized 1"));
  }
  jwt.verify(token, process.env.JWT_secret, (error, user) => {
    if (error) {
      return next(errorHandler(401, "Unauthorized 2"));
    } else {
      req.user = user;
      next();
    }
  });
};
