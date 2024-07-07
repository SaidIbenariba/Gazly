import express from "express";
import {
  getMeetings,
  createMeeting,
  editMeeting,
  deleteMeeting,
} from "../controllers/meeting.js";
const router = express.Router();
router.get("/read", getMeetings);
router.get("/", getMeetings);

router.post("/create", createMeeting);
router.put("/edit/:start/:end/:id_resp", editMeeting);
router.delete("/delete/:start/:end/:id_resp", deleteMeeting);
export default router;
