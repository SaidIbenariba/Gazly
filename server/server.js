const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
// option 1 : allows all origins with default cors
app.use(cors()); // cors policy
// option 2 : custom origins
// app.use(cors({
//   origin:'http://localhost:5173/',
//   methods:['GET','POST','PUT','DELETE'];
//   allowedHeaders:[],
// }))
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "magasin",
});
// db.connect((err) => console.log(err));

app.post("/add_user", (req, res) => {
  console.log(`server recieve form`);
  sql =
    "INSERT INTO users (`ID`,`Nom`,`Tel`,`Ville`,`Adresse`) VALUES (?,?,?,?,?)";
  const values = [
    req.body.id,
    req.body.nom,
    req.body.tel,
    req.body.ville,
    req.body.adresse,
  ];
  db.query(sql, values, (err, result) => {
    // console.log(result);
    if (err) return res.json({ message: "exception occured" + err });
    return res.json({ succes: "Client added !" });
  });
});
// edit user
app.post("/edit_user/:id", (req, res) => {
  console.log(`server recieve form`);
  console.log(req);
  sql = "UPDATE users SET `Nom`=?,`Tel`=?,`Ville`=?,`Adresse`=? WHERE ID=?";
  const id = req.params.id;
  const values = [
    req.body.nom,
    req.body.tel,
    req.body.ville,
    req.body.adresse,
    id,
  ];
  db.query(sql, values, (err, result) => {
    // console.log(result);
    if (err) return res.json({ message: "exception occured" + err });
    return res.json({ succes: "Client Updated !" });
  });
});
// delete user
app.get("/delete_user/:id", (req, res) => {
  console.log(`server recieve form`);
  sql = "DELETE FROM users WHERE ID=?";
  const id = req.params.id;
  db.query(sql, id, (err, result) => {
    // console.log(result);
    if (err) return res.json({ message: "exception occured" + err });
    return res.json({ succes: "Client Deleted !" });
  });
});

app.get("/read_user/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE ID=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "not select use" + err });
    return res.json(result);
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "mysql" + err });
    return res.json(result);
  });
});

app.listen(port, () => {
  console.log("is listening to the port");
});
