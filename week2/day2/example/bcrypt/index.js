import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(bodyParser.json({ extented: true }))

app.post("/hash", (req, res) => {
    const { password } = req.body;

    console.log(password);

    bcrypt.hash(password, 10, (err, hashed) => {
        if(err) {
            res.json({
                message: err.message
            })
        }

        res.json({
            hashedPassword: hashed
        })
    })
})

app.post("/compare", (req, res) => {
    const { password, hashedPassword } = req.body;

    bcrypt.compare(password, hashedPassword, (err, result) => {
        if(err) {
            res.json({
                err
            })
        }

        res.json({
            result
        })
    })
})

app.listen(3001, () => {
    console.log("Server is running on 3001");
})