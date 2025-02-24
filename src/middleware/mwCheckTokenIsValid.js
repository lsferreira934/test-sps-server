import { hasTokenInBlacklist } from "../service/tokenService.js";
import jwt from "jsonwebtoken";

export const checkTokenIsValid = async (req, res, next) => {
  if(!req.headers["authorization"] || !req.headers["authorization"].includes("Bearer ")) return res.status(500).end();
  
  const token = req.headers["authorization"].replace('Bearer ', '');

  if (!token) return res.status(401).json({ error: "Token invalid" });

  const isTokenInBlacklist = await hasTokenInBlacklist(token);
  if (isTokenInBlacklist) return res.status(401).json({ error: "Token invalid" });

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token invalid" });
    req.$userId = decoded.id;
    next();
  });
};
