import express from 'express';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const router = express.Router();


router.get('/',(req,res)=>{
    
    const indexContent= '<h1>Hello Node!</h1>' +
   ' <br/>'+
    '<a href="http://localhost:8000/read-message">Read Message</a>'+
    '<br/>'+
    '<br/>'+
    '<a href="http://localhost:8000/write-message">Write Message</a>';

    res.send(indexContent);
});

router.get('/write-message', (req, res) => {
    const formHtml = `
      <h1>Form Page</h1>
      <form action="/submit" method="post">
        <input type="text" name="message" placeholder="Enter your message">
        <button type="submit">Submit</button>
      </form>
    `;
    res.send(formHtml);
  });
  

  router.post('/submit', (req, res) => {
    const message = req.body.message;
    const filePath = path.join(__dirname, 'messages.txt');
    
    fs.appendFile(filePath, `${message}\n`, (err) => {
      if (err) {
        console.error('Error writing message to file:', err);
        res.sendStatus(500); 
      } else {
        console.log('Message saved to file successfully');
        res.redirect('/');
      }
    });
  });
  

  const __dirname = dirname(fileURLToPath(import.meta.url));


  router.get('/read-message', (req, res) => {
    const filePath = path.join(__dirname, 'messages.txt');
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading message from file:', err);
        res.sendStatus(500);
      } else {
        const responseHtml = `
        <h1>Message Received</h1>
        <p>You entered: ${data}</p>
        <a href="http://localhost:8000/">home</a>
      `;
      res.send(responseHtml);
        
      }
    });
  });
  



  export default router;