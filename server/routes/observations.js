import express from "express";
import {
    getObservationsDash,
    getObservations,
    createObservation,
    editObservation, 
    deleteObservation
} from "../controllers/observation.js";
const router = express.Router();
router.get("/lastest",getObservationsDash);

router.get("/espace/:id_ws?", getObservations) ; 
router.put("/edit/:date/:id_ws/:id_resp",editObservation); 
// router.get("/create")
router.get("/status/:status?",getObservations); 
router.get("/:date?/:id_ws?/:id_resp?",getObservations); 
router.get("/",getObservations);
router.post("/create", createObservation); 
router.delete("/delete/:date/:id_ws/:id_resp",deleteObservation); 
export default router;
