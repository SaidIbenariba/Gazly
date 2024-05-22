import mysql from "mysql";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  port: "3308",
  user: "root",
  password: "",
  database: "pfe-project",
});
