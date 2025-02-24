import { Router } from "express";
const userRouter = Router();

import { checkTokenIsValid } from "../middleware/mwCheckTokenIsValid.js";
import { mwCheckIsRoleAdmin } from "../middleware/mwCheckIsRoleAdmin.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userControllers.js";

userRouter.get("/users", checkTokenIsValid, getUsers);
userRouter.get("/user/:id", [checkTokenIsValid, mwCheckIsRoleAdmin], getUser);
userRouter.post("/user", [checkTokenIsValid, mwCheckIsRoleAdmin], createUser);
userRouter.put("/user/:id", [checkTokenIsValid, mwCheckIsRoleAdmin], updateUser);
userRouter.delete("/user/:id", [checkTokenIsValid, mwCheckIsRoleAdmin], deleteUser);
export default userRouter;
