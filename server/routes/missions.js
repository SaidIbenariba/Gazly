import express from "express";
import {
    missionsInProgress,
    getMissionsInProgress,
    missionsInReview,
    getMissionsInReview,
    missionsOnHold,
    getMissionsOnHold,
    missionsCompleted,
    getMissionsCompleted,
    missionsExpired,
    getMissionsExpired,
    getMissions,
    createMission,
    adminMissionSearch,
} from "../controllers/mission.js";
const router = express.Router();
router.get("/missionsInProgress",missionsInProgress);
router.get("/missionsInReview",missionsInReview);
router.get("/missionsOnHold",missionsOnHold);
router.get("/missionsCompleted",missionsCompleted);
router.get("/missionsExpired",missionsExpired);
router.get("/getMissionsInProgress",getMissionsInProgress);
router.get("/getMissionsInReview",getMissionsInReview);
router.get("/getMissionsOnHold",getMissionsOnHold);
router.get("/getMissionsCompleted",getMissionsCompleted);
router.get("/getMissionsExpired",getMissionsExpired);
router.get("/",getMissions);
router.post("/createMission",createMission);
router.get("/adminMissionSearch",adminMissionSearch);


export default router;
