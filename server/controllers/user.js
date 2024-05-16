import { db } from "../connect_db.js";
import bcrypt from "bcryptjs";

export const getUser = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM users WHERE id = ?`;
  db.query(q, req.params.userId, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const search = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM users WHERE firstname LIKE ? `;
  db.query(q, [req.params.text], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const searchByRole = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM users WHERE role = ?`;
  db.query(q, [req.params.role], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const createUser = (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, req.body.email, (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ messsage: "Error mysql when select from users" + err });
    if (data.length > 0) {
      console.log("User already exits");
      return res.status(409).json("User already exists!");
    }
    // HERE SPECIFIC ROLE OF USER

    // CREATE A NEW USER TO DATABASE USE UPDATE QUERY
    // HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO users (`firstname`,`lastname`,`email`,`password`,`role`) VALUE(?) ";
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    db.query(q, [Object.values(newUser)], (err, result) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json({ succes: `New User ${newUser[0]} created ` });
    });
  });
};
export const editUser = (req, res) => {
  const q =
    "UPDATE users SET firstname=?, lastname=?, email=?, role=?  WHERE id= ? ";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.role,
    req.params.userId,
  ];
  db.query(q, values, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE id= ? ";
  db.query(q, req.params.userId, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const users = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, users) => {
    if (err) res.status(500).json("Can not connect to database");
    return res.json(users);
  });
};
