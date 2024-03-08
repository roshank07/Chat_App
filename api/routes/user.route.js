import express from "express";
import userController from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/signup", userController.signUp);

export default userRoute;
