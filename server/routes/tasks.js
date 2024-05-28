import express from "express";
import {
  getTasksForResp,
  getTasksForOuvrier,
  respSearch,
  ouvSearch,
  createTask,
  editTask,
  deleteTask,
  tasks,
} from "../controllers/task.js";
const router = express.Router();

router.get("/", tasks);
router.get("/read/:id_resp", getTasksForResp);
router.get("/read/:id_ouv", getTasksForOuvrier);
router.get("/respSearch/:id_ouv", respSearch);
router.get("/ouvrSearch/:date", ouvSearch);
router.post("/createTask", createTask);
router.put("/edit/:id_ouv", editTask);
router.delete("/delete/:id_ouv", deleteTask);
export default router;
