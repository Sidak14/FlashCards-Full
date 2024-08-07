import express from "express";
import { isAuthorised, login, logout, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/isauthorised", isAuthorised)

export default router;