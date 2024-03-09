import express from "express";
import chatController from "../controllers/chat.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const chatRoute = express.Router();

chatRoute.post("/", verifyUser, chatController.accessChat);
chatRoute.get("/", verifyUser, chatController.fetchChat);
chatRoute.post("/group", verifyUser, chatController.createGroupChat);
chatRoute.put("/rename", verifyUser, chatController.groupRename);
chatRoute.put("/addtogroup", verifyUser, chatController.adduser);
chatRoute.put("/removefromgroup", verifyUser, chatController.removeuser);

export default chatRoute;
