import express from "express";
import {
   createAffectation,
    getAffectations
} from "../controllers/affectation.js";
const router = express.Router();
router.post("/create",createAffectation); 
router.get("/workspace/:id_ws", getAffectations)
export default router;
