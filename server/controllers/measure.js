import { db } from "../connect_db.js";
export const getLastMeasure = (req, res) => {
  const sql = "SELECT * FROM measure ORDER BY date DESC LIMIT 1";
  db.query(sql, (err, users) => {
    if (err) res.status(500).json("Can not connect to database"); 
    console.log(users);
    return res.json(users);
  });
};
export const getMeasures = (req, res) => {
  const sql = "SELECT * FROM measure ORDER BY date DESC";
  db.query(sql, (err, users) => {
    if (err) res.status(500).json("Can not connect to database"); 
    console.log(users);
    return res.json(users);
  });
};