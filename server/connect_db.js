import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  port: "3308", // change in your local code not here
  user: "root",
  password: "",
  database: "pfe-project",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});
