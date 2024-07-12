import { db } from "../connect_db.js";
export const WorkSpacesWithoutRes = (req, res) => {
  const q = `
    SELECT w.id, w.name, a.start, a.end, a.id_resp 
    FROM workspace w
    LEFT JOIN affectation a 
    ON w.id = a.id_ws 
    AND a.start <= CURRENT_TIMESTAMP()
    AND a.end >= CURRENT_TIMESTAMP()
    WHERE a.id_ws IS NULL 
    OR (a.start > CURRENT_TIMESTAMP() OR a.end < CURRENT_TIMESTAMP())
  `;
db.query(q, (err, result) => {
  if (err) {
    return res.status(500).json(err);
  }
  const Data = result.map((row) => ({
    ...row,
  }));
  return res.status(200).json(Data);
});
}
export const getWorkSpace = (req, res) => {
  if (req.role == "admin" || req.role == "responsable") {
    const id_ws = req.params.id_ws;
    const id_resp = req.params.id_resp;
    let q = "";
    let queryParams = [];
    
    if (id_resp) {
      q = `SELECT w.id, w.name, a.start, a.end, a.id_resp 
           FROM workspace w 
           LEFT JOIN affectation a ON w.id = a.id_ws 
           WHERE a.id_resp = ?`;
      queryParams = [id_resp];
    } else if (id_ws) {
      q = `SELECT w.id, w.name, a.start, a.end, a.id_resp 
           FROM workspace w 
           LEFT JOIN affectation a ON w.id = a.id_ws 
           WHERE w.id = ?`;
      queryParams = [id_ws];
    } else {
    
    q = `SELECT w.id, w.name, a.start, a.end, 
           CASE 
             WHEN a.id_resp IS NOT NULL AND a.start <= CURRENT_TIMESTAMP() AND a.end >= CURRENT_TIMESTAMP() THEN a.id_resp
             ELSE NULL
           END AS id_resp
    FROM workspace w
    LEFT JOIN affectation a 
    ON w.id = a.id_ws 
    AND a.start <= CURRENT_TIMESTAMP()
    AND a.end >= CURRENT_TIMESTAMP()
    UNION
    SELECT w.id, w.name, NULL AS start, NULL AS end, NULL AS id_resp
    FROM workspace w
    WHERE NOT EXISTS (
      SELECT 1
      FROM affectation a
      WHERE w.id = a.id_ws
    )`;
    }
    console.log(q);
    db.query(q, queryParams, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const Data = result.map((row) => ({
        id: row.id,
        name: row.name,
        start: row.start,
        end: row.end,
        id_resp: row.id_resp
      }));
      console.log('query:', Data);

      return res.status(200).json(Data);
    });
  } else {
    console.log("you are not authorized!");
    return res.status(403).json('you are not authorized!');
  }
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
    const sql ="INSERT INTO workspace (name) VALUE(?) ";
    const newWorkSpace = {
        name: req.body.name,
    };
    db.query(sql, [...Object.values(newWorkSpace)], (err, result) => {
      if (err) return res.status(500).json(err);
      const id_ws = result.insertId;
      return res 
        .status(200)
        .json({ succes: `New WorkSpace created `, id_ws:id_ws });
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
        const q = "DELETE FROM workspace WHERE id= ? ";
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