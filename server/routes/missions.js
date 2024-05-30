import express from "express";
import {
  getMissionsByStatus,
  getMissions,
  createMission,
  missionSearch,
  getMissionCounts,
  defaultMissionSearch,
} from "../controllers/mission.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();
// router.get("/missionsInProgress", missionsInProgress);

router.get("/missionCounts", getMissionCounts);
router.get("/:status", getMissionsByStatus);
router.get("/", getMissions);
router.post("/createMission", createMission);
router.get("/search/:searchBy/:values", missionSearch);
router.get("/defaultSearch/:values", defaultMissionSearch);

export default router;
/*export const missionSearch = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let sql = "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ?";

  if (userRole === 'admin') {
    sql = "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ? AND m.status = ?";
  } else if (userRole === 'responsable') {
    sql = "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as responsable FROM mission m INNER JOIN users r ON m.id_dir = r.id WHERE m.id_resp = ? AND m.status = ?";
  }
  const queryParams = [req.params.id_dir];

  if (req.params.title) {
    sql +="AND m.title LIKE ?";
    queryParams.push(`%${req.params.title}%`);
  }
  if (req.params.start) {
    sql +="AND m.startdate = ?";
    queryParams.push(req.params.startdate);
  }
  if (req.params.end) {
    sql +="AND m.enddate = ?";
    queryParams.push(req.params.enddate);
  }
  if (req.params.firstname) {
    sql +="AND r.firstname LIKE ?";
    queryParams.push(`%${req.params.firstname}%`);
  }
  if (req.params.lastname) {
    sql +="AND r.lastname LIKE ?";
    queryParams.push(`%${req.params.lastname}%`);
  }
  
  db.query(sql, queryParams, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};*/