import express from "express";
import {
    getLastMeasure,
    getMeasures
} from "../controllers/measure.js";
const router = express.Router();
router.get("/getLastMeasure", getLastMeasure);
router.get("/", getMeasures);

export default router;
