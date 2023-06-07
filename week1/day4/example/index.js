import express from "express";
import bodyParser from "body-parser";
import productRoute from "./route/productRoute.js"

const app = express();
app.use(bodyParser.json()); // middleware to parse json data

app.use("/product", productRoute); 


app.get("/health", (req, res, next) => {
    res.status(200).json({
        message: "Server is UP",
    })
})

app.listen(3001, () => {
    console.log("Server is running on PORT=3001");
})