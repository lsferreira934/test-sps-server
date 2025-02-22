import { Router } from "express";
const authRouter = Router();

import { checkTokenIsValid } from "../middleware/mwCheckTokenIsValid.js";
import { login, logout, register } from "../controllers/authControllers.js";

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", checkTokenIsValid, logout);

export default authRouter;
