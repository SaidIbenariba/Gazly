import express from "express";
import {
    getObservations,
    getObservationsOfWorkSpace,
} from "../controllers/observation.js";
const router = express.Router();
router.get("/lastest",getObservations);
router.get("/getObservationsOf/:id_ws",getObservationsOfWorkSpace);
export default router;
