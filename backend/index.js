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

app.use(cors());
app.use(express.text())
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
