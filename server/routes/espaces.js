import express from "express";
import {
    getWorkSpace,
    WorkSpaceSearchByResp,
    WorkSpaceSearchByName,
    createWorkSpace,
    editWorkSpace,
    deleteWorkSpace,
    WorkSpaces,
} from "../controllers/espace.js";
const router = express.Router();
router.get("/", WorkSpaces);
router.get("/read/:WorkSpacenb", getWorkSpace);
router.get("/read/:id_resp", WorkSpaceSearchByResp);
router.get("/respSearch/:name", WorkSpaceSearchByName);
router.post("/createWorkSpace", createWorkSpace);
router.put("/edit/:name", editWorkSpace);
router.delete("/delete/:WorkSpacenb", deleteWorkSpace);
export default router;
