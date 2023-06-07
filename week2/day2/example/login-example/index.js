import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import { authenticateToken } from "./middware/authMiddleware.js";

const app = express();
dotenv.config()
app.use(bodyParser.json({ extended: true }));

app.use("/auth", authRoutes);

app.get("/protected", authenticateToken, (req, res) => {
    // logic
    res.json({
        message: "Hello World"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})