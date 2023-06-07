import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./route/authRoutes.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;
const server = express();
server.use(bodyParser.json({ extended: true }));
server.use(cors()); 

server.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is running!",
        author: "admin"
    })
})

server.use("/api/auth", authRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})