import express from 'express';
import routes from './routes.js'


const port = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',routes);

app.listen(port,()=>{
    console.log("Listening to port 8000");
});