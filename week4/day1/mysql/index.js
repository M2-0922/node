import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js"
import bodyParser from "body-parser";

// routes
import userRoute from "./route/user.js"

dotenv.config();

const server = express();

server.use(bodyParser.json({
    extended: true
}))

server.get("/health", (req, res) => {
    res.json({
        author: "admin",
        info: "healthy"
    })
})

server.use("/api/user", userRoute);

server.listen(process.env.PORT, () => {
    console.log(`server is running on PORT: ${process.env.PORT}`);
})