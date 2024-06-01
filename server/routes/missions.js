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
