import bcrypt from "bcrypt";
import db from "../db.js";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const saltRounds = 2;

export const register = async (req, res) => {
    const reqData = JSON.parse(req.body);
    const email = reqData.email;
    const password = reqData.password;
    const confirmPassword = reqData.confirmPassword;

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

export const loginSucess = (req, res) => {
    console.log("hi success");
    return res.status(200).json(req.user.id);
}

export const loginFail = (req, res) =>  {
    console.log("hi fail");
    console.log(req.body)
    return res.status(400).json("err");
}

export const login2 = async (req, res) => {
    console.log(req.body);
    console.log(req.user);
}

export const logout = (req, res) => {

}

passport.use(new Strategy(async function verify(email, password, cb) {
    console.log("hi strategy:)");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return cb("Invalid Email");
    }

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", 
            [email]
        );
        if (result.rows.length <= 0) {
            return cb("User not found!");
        }

        const user = result.rows[0];
        const storedPassword = user.password;

        bcrypt.compare(password, storedPassword, async (err, result) => {
            if (err) {
                return cb(err);
            }

            if (result) {
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        });

    } catch (err) {
        return cb(err);
    }
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});