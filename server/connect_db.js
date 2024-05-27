import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  port: "3308",
  user: "root",
  password: "",
  database: "pfe-project",
});
