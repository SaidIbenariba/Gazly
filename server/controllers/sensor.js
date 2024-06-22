import { db } from "../connect_db.js";
export const getSensor = (req, res) => {
    const workspace= req.params.id_ws;
    let query=[];
    let sql = "SELECT * FROM sensor ";
    if(workspace){
        sql = "SELECT * FROM sensor WHERE id_ws = ?";
        query=[req.params.id_ws];
    }
    db.query(sql,query, (err, sensors) => {
      if (err) res.status(500).json("Can not connect to database"); 
      console.log(sensors);
      return res.json(sensors);
    });
  };
  export const creatMeasures = (req, res) => {
    const sql ="INSERT INTO sensor (type,id_ws) VALUES(?,?) ";
    const newsensors = {
      type: req.body.type,
      id_ws: req.body.id_ws,
    };
    db.query(sql,[Object.values(newsensors)], (err, sensors) => {
      if (err) res.status(500).json("Can not connect to database"); 
      console.log(sensors);
      return res.json(sensors);
    });
  };
  export const editSensor = (req, res) => {
    const q =
      "UPDATE sensor SET type=?, id_ws=?, WHERE id= ? ";
    const values = {
        type: req.body.type,
        id_ws: req.body.id_ws,
      };
    db.query(q, values, (err, result) => {
        if (err) return res.sendStatus(500);
        return res.status(200).json(result);
      });
};
export const deleteSensor = (req, res) => {
    const q = "DELETE FROM sensor WHERE id= ? ";
    db.query(q, req.params.id, (err, result) => {
      if (err) return res.sendStatus(500);
      return res.status(200).json(result);
    });
};