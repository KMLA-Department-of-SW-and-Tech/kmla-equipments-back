import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import equipRoutes from './routes/equip.js';
import commentRoutes from './routes/comment.js';
import errorRoutes from './routes/error.js';

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json());

app.use(helmet());
app.use(morgan("dev"));

app.use(cors());

mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected To MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

//Middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/equip", equipRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/error", errorRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin");
  console.log("Middleware Used");
});

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("Connected to Backend");
});