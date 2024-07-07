import express from "express";
import {
   createAffectation,
    getAffectations, 
    stopAffectation
} from "../controllers/affectation.js";
const router = express.Router();
router.post("/create",createAffectation); 
router.get("/workspace/:id_ws", getAffectations)
router.delete("/stop/:start/:id_ws/:id_resp", stopAffectation); 
export default router;
