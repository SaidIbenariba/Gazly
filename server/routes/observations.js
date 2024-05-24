import express from "express";
import {
    getObservations,
} from "../controllers/observation.js";
const router = express.Router();
router.get("/",getObservations);
export default router;
