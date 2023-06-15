import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// import models
import User from "./model/user.js";

// connect to database
import db from "./config/db.js";

// initialize express
const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json({ extended: true }));
app.use(cors());

// auth controllers and routes
// login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id,
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "10s" });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: "1d" });

        user.refreshToken = refreshToken;

        await user.save();

        return res.status(200).json({ token, refreshToken });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        const payload = { 
            user: {
                id: user.id,
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "10s" });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: "1d" });

        user.refreshToken = refreshToken;

        await user.save();

        return res.status(200).json({ token, refreshToken });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

app.post("/refresh-token", (req, res) => {
    const { refreshToken } = req.body;

    if(!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY_REFRESH, (err, decoded) => {
        if(err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        try {
            const payload = { 
                user: {
                    id: decoded.user.id,
                }
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "10s" });

            return res.status(200).json({ token });

        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    });
});

// authenticate middleware
const authenticate = (req, res, next) => {
    const { token } = req.headers;

    if(!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = decoded.user;
        next();
    });
};

app.get("/protected", authenticate, (req, res) => {
    res.status(200).json({ message: "Protected route" });
});

// listen express server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});