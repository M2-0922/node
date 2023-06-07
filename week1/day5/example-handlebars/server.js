import express from "express";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res, next) => {
    let todos = [
        {
            id: 1,
            title: "Learn NodeJS",
            completed: false
        },
        {
            id: 2,
            title: "Learn ExpressJS",
            completed: true
        },
        {
            id: 3,
            title: "Learn Handlebars",
            completed: true
        }
    ]
    res.render("index", { todos })
})

app.listen(3001, () => {
    console.log("Server is running on 3001");
})