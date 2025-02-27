import express from "express";
import { login, register, logout, autologin } from "../controllers/auth.js";

const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/autologin", autologin);
// router.get("/dashboard", authorizeRole("admin"), (req, res) => {
//   // Only users with the 'admin' role can access this endpoint
//   res.json({ message: "Welcome to the dashboard" });
// });
export default router;
