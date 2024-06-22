import express from "express";
import {
    getTasks,
    respSearch,
    ouvSearch,
    createTask,
    editTask,
    deleteTask,
} from "../controllers/task.js";
const router = express.Router();
router.get("/", getTasks);
router.get("/status/:status?", getTasks);
router.get("/:date?/:id_resp?/:id_ouv?", getTasks);
router.get("/respSearch/:id_ouv", respSearch);
router.get("/ouvrSearch/:date", ouvSearch);
router.post("/createTask", createTask);
router.put("/edit/:date/:id_resp/:id_ouv", editTask);
router.delete("/delete/:id_ouv", deleteTask);
export default router;
