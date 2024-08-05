import express from "express";
import { login2, loginFail, loginSucess, logout, register } from "../controllers/auth.js";
import passport from "passport";
import { Strategy } from "passport-local";

const router = express.Router();

router.post("/register", register);
/*router.get("/loginfail", loginFail);
router.post("/login", passport.authenticate('local', { successRedirect: '/loginsucess', failureRedirect: '/loginfail' }), loginSucess, loginFail);
router.get("/loginsuccess", loginSucess);*/
router.post('/login', passport.authenticate('local', { session: true }), login2);

router.post("/logout", logout);

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

export default router;