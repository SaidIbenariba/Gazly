import { db } from "../connect_db.js";

export const getUser = (req, res) => {
  res.send("it works!");
};
export const createUser = (req, res) => {
  res.send("User Created");
};
export const users = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, users) => {
    if (err) res.sensStatus(500);
    return res.json(users);
  });
};
