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
  const sql = "SELECT * FROM measure WHERE id_cap=? ORDER BY date DESC ";  
  db.query(sql,req.params.id_cap, (err, users) => {
    if (err) res.status(500).json("Can not connect to database table measure"); 
    console.log(users);
    return res.json(users);
  });
};