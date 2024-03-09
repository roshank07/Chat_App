import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

const chatController = {
  accessChat: async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
      return next(errorHandler(400, "UserId not passed as a body"));
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name,pic,email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user.id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.find({
          _id: createdChat._id,
        }).populate("users", "-password");
        res.status(200).send(fullChat);
      } catch (error) {
        next(error);
      }
    }
  },
  fetchChat: async (req, res, next) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (result) => {
          result = await User.populate(result, {
            path: "latestMessage.sender",
            select: "name,pic,email",
          });
          res.status(200).send(result);
        });
    } catch (error) {
      next(error);
    }
  },
  createGroupChat: async (req, res, next) => {
    try {
      if (!req.body.users || !req.body.name) {
        return next(errorHandler(400, "Please enter all the fields!!!"));
      }
      var users = JSON.parse(req.body.users);

      if (users.length < 2) {
        return next(
          errorHandler(400, "More than 2 users needed to form group.")
        );
      }
      users.push(req.user.id);
      const groupChat = await Chat.create({
        chatName: req.body.name,
        isGroupChat: true,
        users: users,
        groupAdmin: req.user.id,
      });
      const fullGroupChat = await Chat.find({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      res.status(200).json(fullGroupChat);
    } catch (error) {
      next(error);
    }
  },
  groupRename: async (req, res, next) => {
    const { chatId, chatName } = req.body;
    try {
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          chatName,
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      if (!updatedChat) {
        return next(errorHandler(404, "Chat not found."));
      }
      res.status(200).json(updatedChat);
    } catch (error) {
      next(error);
    }
  },
  adduser: async (req, res, next) => {
    const { chatId, userId } = req.body;
    try {
      const updatedUser = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      //   console.log(updatedUser,'->','->',chatID,userId)
      if (!updatedUser) {
        return next(errorHandler(404, "Chat not found."));
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  removeuser: async (req, res, next) => {
    const { chatId, userId } = req.body;
    try {
      const updatedUser = await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      //   console.log(updatedUser,'->','->',chatID,userId)
      if (!updatedUser) {
        return next(errorHandler(404, "Chat not found."));
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
};

export default chatController;
