import mysql from "mysql";
import dotenv from "dotenv"; 
dotenv.config();
export const db = mysql.createConnection({  
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: process.env.DB_TIME_ZONE,
});
db.connect((err) => {    
  if (err) console.log(err);
  else 
  console.log("Connected to MySQL database");
});
  