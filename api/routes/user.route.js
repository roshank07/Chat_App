import express from "express";
import userController from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const userRoute = express.Router();

userRoute.post("/signup", userController.signUp);
userRoute.post("/login", userController.login);
userRoute.get("/search_user", verifyUser, userController.search_user);

export default userRoute;
