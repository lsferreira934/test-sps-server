import { Router } from "express";
const userRouter = Router();

import { checkTokenIsValid } from "../middleware/mwCheckTokenIsValid.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userControllers.js";

const middlewares = [checkTokenIsValid];

userRouter.get("/users", middlewares, getUsers);
userRouter.get("/user/:id", middlewares, getUser);
userRouter.post("/user", middlewares, createUser);
userRouter.put("/user/:id", middlewares, updateUser);
userRouter.delete("/user/:id", middlewares, deleteUser);
export default userRouter;
