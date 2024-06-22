import express from "express";
import {
  getMissions,
  createMission,
  missionSearch,
  getMissionCounts,
  defaultMissionSearch,
  editMission, 
  deleteMission
} from "../controllers/mission.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();
// router.get("/missionsInProgress", missionsInProgress);
router.get("/defaultSearch", defaultMissionSearch);
router.get("/missionCounts", getMissionCounts);
router.get("/:status?", getMissions);
router.get("/:start?/:id_dir?/:id_resp?",getMissions); 
// router.get("/get/:mission")
router.get("/", getMissions);
router.post("/createMission", createMission);
router.put("/edit/:start/:id_dir/:id_resp",editMission); 
router.get("/search/:searchBy", missionSearch);

router.delete("/delete/:start/:id_dir/:id_resp",deleteMission)
export default router;
