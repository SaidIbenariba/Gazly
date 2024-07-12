import express from "express";
import {
  getMeetings,
  createMeeting,
  editMeeting,
  deleteMeeting,
  Meetings,
} from "../controllers/meeting.js";
const router = express.Router();
router.get("/read", Meetings);
router.get("/", getMeetings);
router.get("/:start/:end/:id_resp", getMeetings)
// router.get("/:id",Meetings);
router.post("/create", createMeeting);
router.put("/edit/:start/:end/:id_resp", editMeeting);
router.delete("/delete/:start/:end/:id_resp", deleteMeeting);
export default router;
