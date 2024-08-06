import db from "../db.js";
import jwt from "jsonwebtoken";

export const getQuestions = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, process.env.SESSION_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        if (userInfo.id != req.params.id) return res.status(400).json("HACKER!!!");

        const query = `SELECT id, question, answer FROM questions WHERE user_id = ${userInfo.id}`;

        try {
            const result = await db.query(query);

            res.status(200).json(result.rows);
        } catch (err) {
            return res.status(500).json(err);
        }
        
        

    })
}

export const deleteQuestion = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, process.env.SESSION_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        if (userInfo.id != req.params.userId) return res.status(400).json("HACKER!!!");

        const query = `DELETE FROM questions WHERE user_id = ${userInfo.id} AND id = ${req.params.questionId}`;

        try {
            const result = await db.query(query);

            res.status(200).json(result.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    });
};