import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";

const saltRounds = 2;

export const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        console.log("failed email test");
        return res.status(400).json("Invalid Email");
    } else if (password.length < 8) {
        return res.status(411).json("Password must be greater than 8 letters.");
    } else if (password !== confirmPassword) {
        return res.status(406).json("Passwords do not match.");
    }

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", 
            [email]
        );
    
        if (checkResult.rows.length > 0) {
            return res.status(409).json("Email already exists, try logging in.");
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log("Error hashing password:", err);
                return res.status(500).json("Error hashing password:" + err);
            }
            const result = await db.query(
                "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                [email, hash]
            );

            const user = result.rows[0];
            req.login(user, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                return res.status(200).json("User has been created.");
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        console.log("failed email test");
        return res.status(400).json("Invalid Email");
    }

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", 
            [email]
        );
        if (result.rows.length <= 0) {
            return res.status(400).json("Incorrect email");
        }

        const user = result.rows[0];
        const storedPassword = user.password;

        bcrypt.compare(password, storedPassword, async (err, result) => {
            if (err) return res.status(500).json(err);

            if (!result) return res.status(400).json("Incorrect password");
            
            const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET);
            const { password, ...other } = user;
            
            res.cookie("access_token", token, {
                maxAge: 1000 * 60 * 60 * 24, // 1000 mlliseconds * 60 seconds * 60 minutes * 24 Hours
                httpOnly: true
            }).status(200).json(other);
        });
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out");
}