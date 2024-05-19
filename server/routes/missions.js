import express from "express";
import { searchBy } from "../controllers/mission.js";
const router = express.Router();
router.get("/search/:searchBy", searchBy);
export default router;
