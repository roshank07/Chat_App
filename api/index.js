import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.db_URL)
  .then(() => {
    console.log("Connected to MongoDB database.");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB Database", err);
  });

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});

/*  ------Deployment------ */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
/*  ------------ */

const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  // cors: {
  //   origin: "*",
  // },
});

io.on("connection", (socket) => {
  // console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not found");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.to(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("disconnect", () => {
    // socket.rooms.size === 0
  });
});

server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
