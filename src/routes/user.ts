import express from "express";
import { signin, signup } from "../controllers/userController.js";
const userRouter = express.Router();
import { checkCredentialsExist } from "../middlewares/login.js";

userRouter.post("/login", checkCredentialsExist, signin);
userRouter.post("/register", signup);

export default userRouter;
