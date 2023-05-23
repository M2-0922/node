import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cookieParser()); //application level middleware
app.use(bodyParser({ extended: true })) //application level middleware

// app.get("/set-cookie", (req, res) => {
//     res.cookie("authentication", "123456789a", {
//         secure: true,
//         httpOnly: true
//     });
//     res.send('Cookie successfully set!');
// })

// app.get("/read-cookie", (req, res) => {
//     const { authentication } = req.cookies;

//     if(authentication) {
//         res.send(`Authentication: ${authentication}`)
//     }
// })

// app.post("/add-to-cart", (req, res) => {
//     const { itemId } = req.body;

//     const cart = req.cookies.cart || [];

//     cart.push(itemId);

//     res.cookie("cart", cart);
//     res.status(201).json({
//         message: "item added to cookie"
//     })

// })

// app.get("/cart", (req, res) => {
//     const cart = req.cookies.cart || [];
//     res.status(200).json({
//         cart: cart
//     })
// })

// app.get('/health', (req, res) => {
//     res.send("Hello");
// })

const database = [
    {
        userId: 1, username: "joe", password: "123456", token: "hello1"
    },
    {
        userId: 2, username: "jane", password: "1a2b3c4d", token: "hello2"
    }
]

const authCheker = (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        const user = database.find(user => user.token == token);
        if(user) {
            req.user = user;
        }
    }
    next();
}

app.get("/me", authCheker, (req, res) => {
    const { user } = req;

    if(user) {
        res.status(200).json({
            user: user
        })
    }else{
        res.status(401).json({
            message: "unauthorized"
        })
    }
})

app.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    const user = database.find(user => user.username === username);

    if(!user) {
        res.status(404).json({
            message: "user couldn't found"
        })
    }

    const newToken = "asdkasdkaskdak";
    
    user.token = newToken;

    res.cookie("token", newToken)

    res.status(200).json({
        user: user,
        message: "successfully login"
    })
})

app.post("/register", (req, res, next) => {
    const { username, password } = req.body;

    const user = database.find(user => user.username = username);
    console.log(user);

    // if(user){
    //     res.status(200).json({
    //         message: "this username already taken!"
    //     })
    // }

    const newUser = {
        userId: database.length + 1,
        username: username,
        password: password,
        token: null,
    }

    database.push(newUser);

    res.status(201).json({
        message: "user created successfully!"
    })
})

app.listen(3001, () => {
    console.log("Server is running on 3001");
})