import http from "http";
import fs from "fs";

const PORT = 8000;

const server = http.createServer();
server.on("request", function (req, res) {
  console.log("This port is 8000");

  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hello Node!</h1>");
    res.write('<a href="http://localhost:8000/read-message">Read Message</a><br>');
    res.write('<a href="http://localhost:8000/write-message">Write Message</a>');
    res.end();
  } else if (req.url === "/read-message") {
    res.statusCode = 200;
    if (req.method === "GET") {
      fs.readFile("messages.txt", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          res.statusCode = 500;
          res.end();
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          res.write("<h1>Messages:</h1>");
          res.write(`<pre>${data}</pre>`);
          res.end();
        }
      });
    }
  } else if (req.url === "/write-message") {
    if (req.method === "GET") {
      // Send HTML form for entering text
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write('<form method="POST" action="/write-message">');
      res.write('<input type="text" name="message" placeholder="Enter your message" />');
      res.write('<button type="submit">Submit</button>');
      res.write("</form>");
      res.end();
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const message = decodeURIComponent(body.split("=")[1]);
        fs.appendFile("messages.txt", message + "\n", (err) => {
          if (err) {
            console.error("Error writing to file:", err);
            res.statusCode = 500;
            res.end();
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write("<h1>Message written successfully!</h1>");
            res.end();
          }
        });
      });
    }
  }
});

server.listen(PORT);
