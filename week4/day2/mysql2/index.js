import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js"

// route
import userRoute from "./route/user.js"

// initialize server
const app = express();

dotenv.config();

// middlewares
app.use(cors());
app.use(bodyParser.json({extended: true}))

app.use("/api/user", userRoute)

// listen
app.listen(process.env.PORT, () => {
    console.log("Hello I am working on #3001");
})