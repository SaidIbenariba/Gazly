import { db } from "../connect_db.js";

export const getMeetingsForAdmin = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM Meeting WHERE id_Admin = ?`;
  db.query(q, req.params.id_Admin, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const getMeetingsForResp = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM Meeting WHERE id_resp = ?`;
  db.query(q, req.params.id_resp, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const respSearch = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM Meeting WHERE id_Admin = ? `;
  db.query(q, [req.params.id_Admin], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};

export const createMeeting = (req, res) => {
  const sql =
    "INSERT INTO Meeting (date,`duree`,`description`,`id_resp`,`id_Admin`) VALUE(?,?,?,?,?) ";
  const newTache = {
    date: req.body.date,
    Duree: req.body.duree,
    Description: req.body.description,
    id_resp: req.body.id_resp,
    id_Admin: req.body.id_Admin,
  };
  db.query(sql, [Object.values(newTache)], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ succes: `New Meeting created ` });
  });
};
export const editMeeting = (req, res) => {
  const q =
    "UPDATE Meeting SET duree=?, description=?, id_Admin=?, id_resp=?  WHERE id= ? ";
  const values = {
    Duree: req.body.duree,
    Description: req.body.description,
    id_Admin: req.body.id_Admin,
    id_resp: req.body.id_resp,
    id: req.params.id,
  };
  db.query(q, values, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const deleteMeeting = (req, res) => {
  const q = "DELETE FROM Meeting WHERE id= ? ";
  db.query(q, req.params.id_resp, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const Meetings = (req, res) => {
  const sql =
    "SELECT m.*,r.firstname,r.lastname FROM meeting m INNER JOIN users r ON  m.id_resp= r.id";
  db.query(sql, (err, users) => {
    if (err) res.status(500).json("Can not connect to database");
    return res.json(users);
  });
};
