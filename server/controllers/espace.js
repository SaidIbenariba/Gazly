import { db } from "../connect_db.js";

export const getWorkSpace = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM workSpace WHERE WorkSpacenb = ?`;
  db.query(q, req.params.WorkSpacenb, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
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
  const q = `SELECT * FROM WorkSpace WHERE name = ? `;
  db.query(q, [req.params.name], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const createWorkSpace = (req, res) => {
  const sql = "INSERT INTO Meeting (name) VALUE(?) ";
  const newWorkSpace = {
    name: req.body.name,
  };
  db.query(sql, [Object.values(newWorkSpace)], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ succes: `New WorkSpace created ` });
  });
};
export const editWorkSpace = (req, res) => {
  const q = "UPDATE WorkSpace SET name=?";
  const values = {
    name: req.body.name,
  };
  db.query(q, values, (err, result) => {
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
export const WorkSpaces = (req, res) => {
  const sql =
    "SELECT ws.*,r.firstname,r.lastname FROM WorkSpace ws INNER JOIN users r ON  ws.id_resp= r.id";
  db.query(sql, (err, users) => {
    if (err) res.status(500).json("Can not connect to database");
    const formattedResults = users.map((row) => ({
      ...row,
      position: [row.x, row.y],
      user: {
        firstname: row.firstname,
        lastname: row.lastname,
      },
    }));
    return res.json(formattedResults);
  });
};
