import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userController = {
  signUp: async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    try {
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
};

export default userController;
