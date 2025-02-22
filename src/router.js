import { Router } from "express";
import authRouter from "./routes/auth_router.js";
import userRouter from "./routes/user_router.js";

const router = Router();

const apiVersion = "/-/v1";

router.use(apiVersion, [authRouter, userRouter]);

export default router;
