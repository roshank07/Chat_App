import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

const userController = {
  signUp: async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    try {
      if (!name || !email || !password) {
        return next(errorHandler(400, "Please enter all the required fields"));
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
        return next(errorHandler(400, "User Already Exists"));
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const new_User = new User({
        name,
        email,
        password: hashPassword,
        pic,
      });

      await new_User.save();
      res.status(200).json("Successfully Signed Up!!!");
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(errorHandler(400, "Please fill all the required fields"));
    }

    try {
      const user = await User.findOne({ email });
      if (user) {
        const passwordVerify = bcrypt.compareSync(password, user.password);
        if (passwordVerify) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_secret);
          const { password, ...rest } = user._doc;
          res
            .status(200)
            .cookie("access_token", token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            })
            .json(rest);
        } else {
          return next(errorHandler(400, "Invalid Password."));
        }
      } else {
        return next(errorHandler(400, "User doesn't exist."));
      }
    } catch (error) {
      next(error);
    }
  },
  search_user: async (req, res, next) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    try {
      const users = await User.find(keyword).find({
        _id: { $ne: req.user.id },
      });
      res.send(users);
    } catch (error) {
      next(error);
    }
  },
  cookie_verification: async (req, res, next) => {
    const userId = req.user.id;

    try {
      const user = await User.findById(userId);
      if (!user) {
        next(errorHandler(400, "Unauthorized"));
      }
      res.status(200).json("Cookie verified successfully");
    } catch (error) {
      next(error);
    }
  },
  userSignout: async (req, res, next) => {
    try {
      res
        .clearCookie("access_token")
        .status(200)
        .json("User has been Signed Out.");
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
