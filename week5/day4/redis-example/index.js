import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import './config/db.js'
import redis_client from "./config/redis.js";
dotenv.config();

// import routes
import authRoute from "./route/auth.js";
import userRoute from "./route/user.js"

// server init
const server = express();

// middlewares
server.use(bodyParser.json({ extended: true }));
server.use(cors());

// routes
server.use("/api/auth", authRoute);
server.use("/api/user", userRoute);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
})