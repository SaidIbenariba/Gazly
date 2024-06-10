import express from "express";
import {
  // getMeetingsForResp,
  getMeetings,
  Meetings,
  respSearch,
  createMeeting,
  editMeeting,
  deleteMeeting,
} from "../controllers/meeting.js";
const router = express.Router();
router.get("/read", getMeetings);
router.get("/", Meetings);

// router.get("/respSearch/:id_Admin", respSearch);
router.post("/create", createMeeting);
router.put("/edit/:id", editMeeting);
router.delete("/delete/:id_resp", deleteMeeting);
export default router;
