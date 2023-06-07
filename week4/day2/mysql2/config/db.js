// get the client
import mysql from "mysql2"
import dotenv from "dotenv";

dotenv.config()

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

connection.connect((err) => {
    if(err) {
        console.log("Error occurred on connection of db: " + err);
        return;
    }

    console.log("Connected to MYSQL DATABASE");
});

export default connection;
