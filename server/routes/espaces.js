import express from "express";
import {
    getWorkSpace,
    WorkSpaceSearchByResp,
    WorkSpaceSearchByName,
    createWorkSpace,
    editWorkSpace,
    deleteWorkSpace,
    WorkSpacesWithoutRes
} from "../controllers/espace.js";
const router = express.Router();
router.get("/", getWorkSpace);
router.get("/noresponsable",WorkSpacesWithoutRes)
router.get("/read/:id_ws", getWorkSpace);
// router.get("/read/:id_resp", WorkSpaceSearchByResp);
router.get("/respSearch/:name", WorkSpaceSearchByName);
router.post("/create", createWorkSpace);
router.put("/edit/:name", editWorkSpace);
router.delete("/delete/:WorkSpacenb", deleteWorkSpace);
// add historic if he work 
export default router;
