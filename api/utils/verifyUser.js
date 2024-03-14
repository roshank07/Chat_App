import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const verifyUser = async (req, res, next) => {
  // console.log("inhere");
  const token = req.cookies.access_token;
  if (!token) {
    console.log("1", token);
    return next(errorHandler(401, "Unauthorized 1"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      console.log("2", error);
      return next(errorHandler(401, "Unauthorized 2"));
    } else {
      req.user = user;
      next();
    }
  });
};
