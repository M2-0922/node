import express from "express";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("pages/home", { message: "Hello Developers!" });
})

app.get("/about", (req, res) => {
    res.render("pages/about");
})

app.get("/product", (req, res) => {

    const products = [
        { id: 1, name: "Iphone 12", price: 1000 },
        { id: 2, name: "Iphone 12 Pro", price: 1200 },
        { id: 3, name: "Iphone 12 Pro Max", price: 1500 },
        { id: 4, name: "Iphone 12 Mini", price: 800 },
        { id: 5, name: "Iphone 11", price: 900 },
        { id: 6, name: "Iphone 11 Pro", price: 1100 },
        { id: 7, name: "Iphone 11 Pro Max", price: 1300 },
        { id: 8, name: "Iphone 11 Mini", price: 700 },
        { id: 9, name: "Iphone X", price: 600 },
        { id: 10, name: "Iphone XS", price: 700 },
    ];

    res.render("pages/product", 
    {
        products,
        isLogin: true
    });
})

// todo-list app using ejs express and node
// handlebars 
// reactjs request to node server

app.listen(3001, () => {
    console.log("Server is running on 3001");
})