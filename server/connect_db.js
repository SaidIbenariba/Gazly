import mysql from "mysql";

export const db = mysql.createConnection({  
  host: "localhost",
  // port: "3306", // change in your local code not here
  user: "root",
  password: "",
  database: "pfe_project",
});
db.connect((err) => {    
  if (err) console.log(err);
  else 
  console.log("Connected to MySQL database");
});
