import express from "express";
import {
    getWorkSpace,
    WorkSpaceSearchByResp,
    WorkSpaceSearchByName,
    createWorkSpace,
    editWorkSpace,
    deleteWorkSpace,
    WorkSpacesWithoutRes,
    getWorkSpaceHistoric
} from "../controllers/espace.js";
const router = express.Router();
router.get("/", getWorkSpace); 
router.get("/noresponsable",WorkSpacesWithoutRes);
router.get("/workspaceID/:id_ws", getWorkSpace);
router.get("/respID/:id_resp", getWorkSpace);

router.get("/read/:WorkSpacenb", getWorkSpace);
router.get("/respSearch/:name", WorkSpaceSearchByName);
router.post("/createWorkSpace", createWorkSpace);
router.put("/edit/:name", editWorkSpace);
router.delete("/delete/:WorkSpacenb", deleteWorkSpace);
router.get("/WorkSpaceHistoric/:id_ws",getWorkSpaceHistoric)
export default router;
