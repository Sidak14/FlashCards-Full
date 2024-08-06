import express from "express";
import cors from "cors";

import env from "dotenv";

import questionRoutes from "./routes/questions.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js"

import cookieParser from "cookie-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

env.config();
const port = process.env.PORT;

const corsOptions = {
  origin: 'http://localhost:3000',
  credientials: true,
};

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Credentials", true);
  next();
})
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
