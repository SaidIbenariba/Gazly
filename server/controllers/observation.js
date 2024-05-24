import { db } from "../connect_db.js";
export const getObservations = (req, res) => {
    const sql = "SELECT o.*,ws.name FROM observation o INNER JOIN workspace ws ON o.id_WS = ws.id";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };