import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import sensorRoutes from "./routes/sensors.js";
import observationRoutes from "./routes/observations.js";
import missionRoutes from "./routes/missions.js";
import meetingRoutes from "./routes/meetings.js";
import measureRoutes from "./routes/measures.js";
import espaceRoutes from "./routes/espaces.js";
import authRoutes from "./routes/auth.js";
import refreshRoutes from "./routes/refresh.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
const app = express();

// app.use(express.static(path.join(__dirname, "public")));
// option 1 : allows all origins with default cors
// app.use(cors()); // cors policy
// option 2 : custom origins
// app.use(cors({
//   origin:'http://localhost:5173/',
//   methods:['GET','POST','PUT','DELETE'];
//   allowedHeaders:[],
// }))
app.use(express.json());
const port = 5000;

// db.connect((err) => console.log(err));

// login
// app.post("/login", (req, res) => {
//   const sql = "SELECT * FROM login WHERE email = ? AND password = ? ";
//   const values = [req.body.email, req.body.password];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "not found this user" } + err);

//     return res.json(result);
//   });
// });
// //
// app.post("/add_user", (req, res) => {
//   console.log(`server recieve form`);
//   const sql =
//     "INSERT INTO users (`ID`,`Nom`,`Tel`,`Ville`,`Adresse`) VALUES (?,?,?,?,?)";
//   const values = [
//     req.body.id,
//     req.body.nom,
//     req.body.tel,
//     req.body.ville,
//     req.body.adresse,
//   ];
//   db.query(sql, values, (err, result) => {
//     // console.log(result);
//     if (err) return res.json({ message: "exception occured" + err });
//     return res.json({ succes: "Client added !" });
//   });
// });
// // edit user
// app.post("/edit_user/:id", (req, res) => {
//   console.log(`server recieve form`);
//   console.log(req);
//   sql = "UPDATE users SET `Nom`=?,`Tel`=?,`Ville`=?,`Adresse`=? WHERE ID=?";
//   const id = req.params.id;
//   const values = [
//     req.body.nom,
//     req.body.tel,
//     req.body.ville,
//     req.body.adresse,
//     id,
//   ];
//   db.query(sql, values, (err, result) => {
//     // console.log(result);
//     if (err) return res.json({ message: "exception occured" + err });
//     return res.json({ succes: "Client Updated !" });
//   });
// });
// // delete user
// app.get("/delete_user/:id", (req, res) => {
//   console.log(`server recieve form`);
//   sql = "DELETE FROM users WHERE ID=?";
//   const id = req.params.id;
//   db.query(sql, id, (err, result) => {
//     // console.log(result);
//     if (err) return res.json({ message: "exception occured" + err });
//     return res.json({ succes: "Client Deleted !" });
//   });
// });

// app.get("/read_user/:id", (req, res) => {
//   const sql = "SELECT * FROM users WHERE ID=?";
//   const id = req.params.id;
//   db.query(sql, [id], (err, result) => {
//     if (err) return res.json({ message: "not select use" + err });
//     return res.json(result);
//   });
// });

// app.get("/users", (req, res) => {
//   const sql = "SELECT * FROM users";
//   db.query(sql, (err, result) => {
//     if (err) return res.json({ message: "mysql" + err });
//     return res.json(result);
//   });
// });

// MIDDLEWARES

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/refresh", refreshRoutes);
app.use(verifyJWT);
app.use("/api/tasks", taskRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/measures", measureRoutes);
app.use("/api/espaces", espaceRoutes);
// app.use(verifyJWT); // anything after this should verified auth
app.use("/api/users", userRoutes);
app.listen(port, () => {
  console.log(`our API working on ${port}`);
});
