import mysql from "mysql"

let connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "helloworld123",
    database: "test"
});

connection.connect((err) => {
    if(err) {
        console.log("Error occurred on connection of db: " + err);
        return;
    }

    console.log("Connected to MYSQL DATABASE");
})

export default connection;