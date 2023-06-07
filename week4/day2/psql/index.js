import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import db from "./config/db.js"

// routes
import userRoute from "./route/user.js"

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}));

app.use("/api/user", userRoute);

app.listen(3001, () => {
    console.log("Hey, server runs on #3001");
})