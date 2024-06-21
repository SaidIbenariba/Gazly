import express from "express";
import {
  getMissions,
  createMission,
  missionSearch,
  getMissionCounts,
  defaultMissionSearch,
  editMission, 
} from "../controllers/mission.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();
// router.get("/missionsInProgress", missionsInProgress);
router.get("/missionCounts", getMissionCounts);
router.get("/:status?", getMissions);
router.get("/:start?/:id_dir?/:id_resp?",getMissions); 
// router.get("/get/:mission")
router.get("/", getMissions);
router.post("/createMission", createMission);
router.post("/edit",editMission); 
router.get("/search/:searchBy/:values", missionSearch);
router.get("/defaultSearch/:values", defaultMissionSearch);

export default router;
