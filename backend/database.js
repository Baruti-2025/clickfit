import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  database: "clickfit",
  user: "root",
  password: "",
});

// connect to mysql database
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// create users table
con.query(
  "CREATE TABLE users(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL, type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL, active TINYINT default 1)",
  (error, result) => {
    if (error) throw error;
    console.log("Table created");
  }
);
