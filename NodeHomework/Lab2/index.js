const http = require('http');
const fs = require("fs")
const bodyParser = require('body-parser');

const port = 8000;
const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html'); //text/htmlにする
    console.log(req);


    if(req.url === '/'){
        res.statusCode = 200;
        res.write(`
        <h1>Hello Node!</h1>
        <a href="http://localhost:8000/read-message">Read Message</a>
        <a href="http://localhost:8000/write-message">Write Message</a>
      `);
        res.end();
    } else if(req.url === '/read-message'){
        res.statusCode = 200;
        res.write("<h1>Hello read</h1>");

        res.end();
    }else if (req.url ==='/write-message') {
        res.statusCode = 200;
        res.write(
            <form method="POST" action="/write-message">
          <input type="text" name="message" placeholder="Enter your message" />
          <button type="submit">Submit</button>
        </form>
        );
        

let message = req.body.message
const bufferedVersion = Buffer.from(message);

//ボディにリクエスト？をしてそれをなんかするらしい
fs.writeFile('./test.txt', bufferedVersion, (err) => {
    if (err) {
      console.error(err);
      // エラー処理
    } else {
      // 書き込み成功時の処理
      console.log("the message was succesfully written")
    }
  });
  





server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})}})