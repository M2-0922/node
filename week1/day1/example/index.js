const http = require('http');


const server = http.createServer((req, res) => {
    // console.log(req);
    console.log("Request received");
    // console.log("I request to " + req.url);

    if(req.url == "/"){
        res.setHeader("Content-Type", "text/html");
        res.write("<h1>Hello Aya</h1>");
        res.end();
    }
    else if (req.url == "/hello"){
        // res.setHeader("Content-Type", "")
        res.write("<h1>Hello Developers</h1>");
        res.end();
    }
})

server.on("listening", () => {
    console.log("Server is listening on port 8000");
});

server.listen(8000);


