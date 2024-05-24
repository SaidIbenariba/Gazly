import express from "express";
import {
    getMeetingsForResp,
    getMeetingsForAdmin,
    respSearch,
    createMeeting,
    editMeeting,
    deleteMeeting,
    Meetings,
} from "../controllers/meeting.js";
const router = express.Router();
router.get("/", Meetings);
router.get("/read/:id_resp", getMeetingsForResp);
router.get("/read/:id_Admin", getMeetingsForAdmin);
router.get("/respSearch/:id_Admin", respSearch);
router.post("/createMeeting", createMeeting);
router.put("/edit/:id_resp", editMeeting);
router.delete("/delete/:id_resp", deleteMeeting);
export default router;
