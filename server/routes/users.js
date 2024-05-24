import express from "express";
import {
  getUser,
  createUser,
  users,
  editUser,
  search,
  searchByRole,
  deleteUser,
} from "../controllers/user.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { ROLES_LIST } from "../config/roles_list.js";
const router = express.Router();
router.get("/", users);
router.get("/read/:userId", getUser);
router.get("/search-role/:role", searchByRole);
router.get("/search/:text", search);
router.put("/edit/:userId", editUser);
router.delete("/delete/:userId", deleteUser);
router.post("/create", createUser, verifyRoles(ROLES_LIST.admin));
export default router;
