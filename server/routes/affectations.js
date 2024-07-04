import express from "express";
import {
   createAffectation
} from "../controllers/affectation.js";
const router = express.Router();
router.post("/create",createAffectation); 
export default router;
