import express from "express";
import { addQuestion, deleteQuestion, getQuestions, getTest, updateQuestion } from "../controllers/questions.js";

const router = express.Router();

router.get("/getquestions/:id", getQuestions);
router.delete("/deletequestion/:userId/:questionId", deleteQuestion);
router.put("/updatequestion/:userId/:questionId", updateQuestion);
router.post("/addquestion/:userId", addQuestion);
router.get("/gettest/:userId", getTest);

export default router;