import express from "express";
import {
    getObservationsDash,
    getObservations,
    createObservation,
    editObservation
} from "../controllers/observation.js";
const router = express.Router();
router.get("/lastest",getObservationsDash);
router.get("/",getObservations);
router.get("/:id_ws?", getObservations) ; 
router.get("/edit/:date/:id_ws/:id_resp",editObservation); 
// router.get("/create")
router.get("/:status?",getObservations); 
router.get("/:date?/:id_ws?/:id_resp?",getObservations); 
router.get("/create", createObservation); 
export default router;
