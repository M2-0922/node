import express from "express";
const router = express.Router();
import { generateToken } from "../utils/jwtUtils.js"
import { hashedPassword, comparePasswords } from "../utils/passwordUtils.js"

const users = [
    {
        id: 1,
        username: "user1",
        password: "password1"
    },
    {
        id: 2,
        username: "user2",
        password: "password2"
    }
];

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    let user = users.find(user => user.username === username);

    if(!user) {
        res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const match = await comparePasswords(password, user.password);

    if(!match) {
        res.status(401).json({
            message: "Wrong password!"
        })
    }

    const token = generateToken({ id: user.id, username: user.username });

    res.status(200).json({
        user,
        token,
        message: "successfully login"
    })

})

router.post("/register", async (req, res) => {
    const { username, password } = req.body; // destructure req.body object;

    let existingUser = users.find(user => user.username === username);

    if(existingUser){
        res.status(409).json({
            message: "Username already exist"
        })
    }

    const hashed = await hashedPassword(password);

    const newUser = {
        id: users.length + 1,
        username,
        password: hashed
    }

    users.push(newUser);

    res.status(201).json({
        message: "user registered successfully!",
        newUser
    })

})

export default router;