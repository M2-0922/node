import express from "express"
import dotenv from "dotenv"
import todoRoute from "./routes/todoRoute.js";

dotenv.config()
const PORT = process.env.PORT || 3001;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", todoRoute);

app.get("/", (req, res, next) => {
    res.render("pages/home", { 
        title: "Welcome to our Todo List app!",
        description: "Magna in proident aliquip sit ipsum laborum enim aliquip. Consectetur nisi anim ipsum Lorem ex minim est aute. Amet duis ex fugiat cupidatat irure mollit consectetur fugiat adipisicing. Do consequat esse ut eiusmod occaecat nostrud labore occaecat irure ea incididunt eiusmod.",
        firstButton: "Discover",
     })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})