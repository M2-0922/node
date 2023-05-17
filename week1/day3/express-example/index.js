import express from "express";
// import http from "http";

// const server = http.createServer();

// server.on("request", (req, res) => {
//     if(req.url == "/health"){
        
//     }
// })

// server.listen(3001, () => {
//     console.log("Server is running on 3001 PORT");
// })

const app = express() //initialize express server

function checkAuth (req, res, next) {
    if(req.headers.authorization){
        next()
    }else{
        res.status(401).send("Authentication failed!")
    }
}

function checkEmail (req, res, next) {
    console.log("checking email");
    let email = "alsdlasdlas";
    if(email) {
        next();
    }else{
        res.status(401).send("Email is not valid!");
    }
}

app.use((req, res, next) => {
    console.log("Middleware 1 is running on every request");
    // console.log("Request URL: ", req.url);
    // console.log("Request Method: ", req.method);
    // req.userName = "kubilay";
    // if(req.method !== "GET"){
    //     res.status(400).send("Only GET requests are allowed")
    // }
    // next();

    if(req.headers.authorization){
        next();
    }else{
        res.status(401).send("Authentication failed!")
    }
})

app.get("/health", checkAuth, checkEmail, (req, res) => {
    // console.log("Hello");
    // res.send("Hello")
    // res.status(200).send("<h1>Server is UP!</h1>")
    console.log(req.userName);
    res.status(200).json({
        message: "Server is UP!",
        author: "admin"
    })
})

app.get("/categories", (req, res) => {
    // do some logic here
    res.status(200).send(["Mobile", "Laptop", "Tablet", "Desktop", "Camera"])
})

app.listen(3001, () => {
    console.log("Server is running on 3001 PORT");
})