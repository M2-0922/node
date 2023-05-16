// const http = require("http"); // commonjs
import http from "http" // es6
// so you just need to change the type property in package json as module.
const PORT = 3001;

const server = http.createServer();
server.on("request", function(req, res) {
    // console.error(new Error("Hello devs"));
    // console.log("Request received");
    // console.error("Request received");
    if(req.url === "/"){
        res.statusCode = 200;
        res.end("Hello");
    }
    else if(req.url === "/hello"){
        res.statusCode = 200;
        res.end("<h1>Hello World</h1>");
    }
    else if(req.url === "/categories"){
        res.statusCode = 200;
        let arr = [{id: 1, name: "Category 1"}, {id: 2, name: "Category 2"}];
        res.end(JSON.stringify(arr));
    }
});
server.on("listening", function() {
    console.log(`Server is running on port ${PORT}`);
})

server.listen(PORT);