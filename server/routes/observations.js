import express from "express";
import {
    getObservationsDash,
    getObservations,
    getObservationsOfWorkSpace,
    createObservation
} from "../controllers/observation.js";
const router = express.Router();
router.get("/lastest",getObservationsDash);
router.get("/",getObservations);
router.get("/:status?",getObservations); 
router.get("/create", createObservation); 
router.get("/getObservationsOf/:id_ws",getObservationsOfWorkSpace);
export default router;
