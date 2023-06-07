import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config()

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if(err) {
        console.log("Error occurred on connection of db: " + err);
        return;
    }

    console.log("Connected to MYSQL DATABASE");
})

export default connection;