import { db } from "../connect_db.js";
export const WorkSpacesWithoutRes = (req, res) => {
  const q = `SELECT distinct(a.id_ws),w.*, a.* FROM workspace w LEFT JOIN affectation a ON w.id = a.id_ws AND a.end < CURDATE() GROUP BY 
      w.name`;

db.query(q, (err, result) => {
  if (err) {
    return res.status(500).json(err);
  }
  const Data = result.map((row) => ({
    ...row,
    position: [row.x, row.y]
  }));
  return res.status(200).json(Data);
});
}
export const getWorkSpace = (req, res) => {
  const id_ws = req.params.id_ws; 
  const id_resp = req.params.id_resp; 
  let q = ""; 
  let queryParams = []; 
  
  if(id_resp) { 
    q = `SELECT w.*, a.* FROM workspace w LEFT JOIN affectation a ON w.id = a.id_ws AND a.end >= CURDATE() AND id_resp=?`;
    let queryParams =[id_resp];
  }else if(id_ws) { 
    q = `SELECT w.*, a.* FROM workspace w LEFT JOIN affectation a ON w.id = a.id_ws AND a.end >= CURDATE() AND id_ws=?`;
    let queryParams =[id_ws];
  }else {
   q = `SELECT w.*, a.* FROM workspace w LEFT JOIN affectation a ON w.id = a.id_ws AND a.end >= CURDATE()`;
  // return id_resp of  current responsable of this workspace
  db.query(q,queryParams, (err, result) => {
    if (err) {
       return res.status(500).json(err);
    } 
    const Data = result.map((row) => ({
      ...row, 
      position: [row.x, row.y]
    }));
    return res.status(200).json(Data);
  });}
};
export const getWorkSpaceHistoric = (req, res) => {
  const q = `SELECT  a.*,u.* FROM affectation a INNER JOIN users u ON a.id_resp = u.id WHERE id_ws=?`;
console.log('hi');    
  db.query(q,req.params.id_ws, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};

  
  export const WorkSpaceSearchByResp = (req, res) => {
    const q = `SELECT * FROM Meeting WHERE id_resp = ? `;
    db.query(q, [req.params.id_resp], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  };
  export const WorkSpaceSearchByName = (req, res) => {
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
        const q ="UPDATE WorkSpace SET name=? WHERE id=?";
        const values = {
            name: req.body.name,
            id: req.params.id,
          };
        db.query(q, [Object.values(values)], (err, result) => {
            if (err) return res.sendStatus(500);
            return res.status(200).json(result);
          });
    };
    export const deleteWorkSpace = (req, res) => {
        const q = "DELETE FROM WorkSpace WHERE id= ? ";
        db.query(q, req.params.WorkSpacenb, (err, result) => {
          if (err) return res.sendStatus(500);
          return res.status(200).json(result);
        });
    };
    /*export const WorkSpaces = (req, res) => {
        const sql = "SELECT ws.*,r.firstname,r.lastname FROM workspace ws INNER JOIN users r ON  ws.id_resp= r.id";
        db.query(sql,(err, workSpaces) => {
          if (err) 
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