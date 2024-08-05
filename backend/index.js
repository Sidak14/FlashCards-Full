import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import pg from "pg";
import bcrypt from "bcrypt";

import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

import env from "dotenv";

import questionRoutes from "./routes/questions.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js"

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

env.config();
const port = process.env.PORT;

app.use(cors());
//app.use(bodyParser.json());
app.use(express.text())
//app.use(express.static("public"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            // Milliseconds: 1000 * 60 * 60 * 24 = 1 day.
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.render("login.ejs");
  }
});

app.get("/logout", (req, res) => {
  if (!req.isAuthenticated()) {
    console.log("I don't know how you got here but not allowed");
    res.redirect("/");
    return;
  }

  console.log(req.user);

  req.logout((err) => {
    if (err) {
      res.send("Error loggin out: " + err);
      return;
    }

    res.redirect("/");
  })
})

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets.ejs");
    } else {
        res.redirect("/login");
    }
})

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
})

app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", 
            [email]
        );
    
        if (checkResult.rows.length > 0) {
            res.send("Email already exists, try logging in.");
            return;
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log("Error hashing password:", err);
                res.send("Error hashing password:" + err);
                return;
            }
            const result = await db.query(
                "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                [email, hash]
            );

            const user = result.rows[0];
            req.login(user, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                res.render("/secrets.ejs");
            });
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login"
}));

passport.use(new Strategy(async function verify(email, password, cb) {
    console.log("hi strategy:)")

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
