import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost", // lamp-mysql8
  // port:"3306",
  user: "root",
  password: "",
  database: "pfe_project",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

export default db;
