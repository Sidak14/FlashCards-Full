import express from "express";
import { deleteQuestion, getQuestions } from "../controllers/questions.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json("This is post");
});
router.get("/getquestions/:id", getQuestions);
router.delete("/deletequestion/:userId/:questionId", deleteQuestion);

export default router;