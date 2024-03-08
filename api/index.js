import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT} `);
});

mongoose
  .connect(process.env.db_URL)
  .then(() => {
    console.log("Connected to MongoDB database.");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB Database", err);
  });
