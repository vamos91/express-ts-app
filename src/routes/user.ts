import express from "express";
import { signin, signup } from "../controllers/userController.js";
const userRouter = express.Router();

import {
  checkCredentialsExist,
  checkUserNotExist,
} from "../middlewares/login.js";

userRouter.post("/login", checkCredentialsExist, checkUserNotExist, signin);
userRouter.post("/register", checkCredentialsExist, signup);

export default userRouter;
