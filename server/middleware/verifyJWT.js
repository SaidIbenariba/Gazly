import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";
import { ROLES_LIST } from "../config/roles_list.js";
dotenv.config();
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json("we can't find authorization header");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(400).json(`Is not authorized`);
    req.id = decoded.UserInfo.id;
    req.role = Object.keys(ROLES_LIST).find(
      (key) => ROLES_LIST[key] === decoded.UserInfo.role
    );
    next();
  });
};
