import express from "express";
import {
    getSensor,
} from "../controllers/sensor.js";
const router = express.Router();
router.get("/", getSensor);
router.get("/:id_ws", getSensor);

export default router;
