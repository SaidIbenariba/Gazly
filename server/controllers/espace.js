import { db } from "../connect_db.js";
export const WorkSpacesWithoutRes = (req, res) => {
  const q = `SELECT w.*, a.* FROM workspace w LEFT JOIN affectation a ON w.id = a.id_ws AND a.end < CURDATE()`;

db.query(q, (err, result) => {
  if (err) {
    console.log(err);
    return res.status(500).json(err);
  }
  const Data = result.map((row) => ({
    ...row,
    position: [row.x, row.y]
  }));
  console.log(Data);
  return res.status(200).json(Data);
});
}
export const getWorkSpace = (req, res) => {
  const q = `SELECT w.*, a.* FROM workspace w LEFT JOIN affectation a ON w.id = a.id_ws AND a.end >= CURDATE()`;

  db.query(q, (err, result) => {
    if (err) {
      console.log(err);   
       return res.status(500).json(err);
    } 
    const Data = result.map((row) => ({
      ...row, 
      position: [row.x, row.y]
    }));
    console.log(Data);
    return res.status(200).json(Data);
  });
};
export const getWorkSpaceHistoric = (req, res) => {
  const q = `SELECT  a.*,u.* FROM affectation w INNER JOIN user u ON a.id_resp = u.id WHERE id_ws=?`;

  db.query(q,req.params.id_ws, (err, result) => {
    if (err) return res.status(500).json(err);

    

    /*const Data = result.map((row) => ({
      ...row, 
    }));*/

    return res.status(200).json(Data);
  });
};

  
  export const WorkSpaceSearchByResp = (req, res) => {
    // console.log(req.params);
    const q = `SELECT * FROM Meeting WHERE id_resp = ? `;
    db.query(q, [req.params.id_resp], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  };
  export const WorkSpaceSearchByName = (req, res) => {
    // console.log(req.params);
    const q = `SELECT * FROM workspace WHERE name = ? `;
    db.query(q, [req.params.name], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  };
  export const createWorkSpace = (req, res) => {
    const sql ="INSERT INTO Meeting (name) VALUE(?) ";
    const newWorkSpace = {
        name: req.body.name,
    };
    db.query(sql, [Object.values(newWorkSpace)], (err, result) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json({ succes: `New WorkSpace created ` });
    });
    };
    export const editWorkSpace= (req, res) => {
        const q =
          "UPDATE WorkSpace SET name=?";
        const values = {
            name: req.body.name,
          };
        db.query(q, [Object.values(values)], (err, result) => {
            if (err) return res.sendStatus(500);
            return res.status(200).json(result);
          });
    };
    export const deleteWorkSpace = (req, res) => {
        const q = "DELETE FROM WorkSpace WHERE WorkSpacenb= ? ";
        db.query(q, req.params.WorkSpacenb, (err, result) => {
          if (err) return res.sendStatus(500);
          return res.status(200).json(result);
        });
    };
    /*export const WorkSpaces = (req, res) => {
        const sql = "SELECT ws.*,r.firstname,r.lastname FROM workspace ws INNER JOIN users r ON  ws.id_resp= r.id";
        db.query(sql,(err, workSpaces) => {
          if (err) console.log(err); 
          const formattedResults = workSpaces.map(row => ({
            ...row,
            position:[
              row.x,
              row.y, 
            ],
            
          }));console.log(formattedResults);
          return res.json(formattedResults);
        });
      };*/