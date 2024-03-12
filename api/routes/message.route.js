import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import messageController from "../controllers/message.controller.js";

const messageRoute = express.Router();

messageRoute.post("/", verifyUser, messageController.sendMessage);
messageRoute.get("/:chatId", verifyUser, messageController.allMessage);

export default messageRoute;
