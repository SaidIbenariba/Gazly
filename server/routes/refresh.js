import express from "express";
import { handleRefreshToken } from "../controllers/refreshToken.js";
const router = express.Router();
router.post("/", handleRefreshToken);
export default router;
