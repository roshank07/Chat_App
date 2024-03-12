import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import errorHandler from "../utils/error.js";

const messageController = {
  sendMessage: async (req, res, next) => {
    const { chatId, content } = req.body;
    if (!chatId || !content) {
      return next(errorHandler(400, "Invalid data passed into request"));
    }

    try {
      let message = await Message.create({
        sender: req.user.id,
        content: content,
        chat: chatId,
      });

      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });

      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  allMessage: async (req, res, next) => {
    const chatId = req.params.chatId;

    try {
      const message = await Message.find({ chat: chatId })
        .populate("sender", "name pic email")
        .populate("chat");

      res.status(200).json(message);
    } catch (error) {
      next(errorHandler(400, error.message));
    }
  },
};

export default messageController;
