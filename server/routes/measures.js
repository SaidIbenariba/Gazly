import express from "express";
import {
    getLastMeasure,
    getMeasures
} from "../controllers/measure.js";
const router = express.Router();
router.get("/getLastMeasure", getLastMeasure);
router.get("/", getMeasures);
router.get("/danger/:danger",getMeasures); 
router.get("/sensor/:id_cap", getMeasures)
router.get("/workspace/:id_ws",getMeasures)

export default router;
