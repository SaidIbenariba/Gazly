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
  const {danger} = req.params; 
  const {id_cap} = req.params; 
  const {id_ws} = req.params; 
  let sql = ""; 
  let queryParams = [];
  if(danger) { 
    sql = "SELECT * FROM measure WHERE gaz_danger=? ORDER BY date DESC "; 
    queryParams = [danger]; 
  } else if(id_cap){ 
    sql = "SELECT * FROM measure WHERE id_cap=? ORDER BY date DESC "; 
    queryParams = [id_cap]; 
  } else if(id_ws) {  // I want to search with work
    sql = "SELECT * FROM measure WHERE =? ORDER BY date DESC "; 
    queryParams = [id_ws]; 
  }
  else { 
    sql = "SELECT * FROM measure ORDER BY date DESC";
  } 
  db.query(sql,[...queryParams], (err, users) => {
    if (err)  {console.log(err); 
      return res.status(500).json("Can not connect to database   table measure");
    }  
    console.log(users);
    return res.json(users);
  });
};