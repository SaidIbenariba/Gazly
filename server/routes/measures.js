import express from "express";
import {
    getLastMeasure,
} from "../controllers/measure.js";
const router = express.Router();
router.get("/getLastMeasure", getLastMeasure);
export default router;
