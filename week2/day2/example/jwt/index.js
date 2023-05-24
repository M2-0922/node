import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import bodyParser from "body-parser";

const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true }))


app.get("/", (req, res) => {
    const user = {
        id: 1,
        fullName: "Joe Doe",
        email: "joe@doe.com"
    }
    jwt.sign(user, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "1 minutes"}, (err, token) => {
        if(err) {
            console.log(err);
            return;
        }
        res.status(200).json({
            message: "successfull",
            token: token
        })
    })
})

app.post("/", (req, res) => {
    const { token } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            console.log(err);
            res.json({
                message: "token is expired"
            })
        }
        console.log(decoded);
        res.json({
            decoded
        })
    })
})

app.listen(3001, () => {
    console.log("Server is running on 3001");
})