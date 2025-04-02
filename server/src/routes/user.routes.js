import {Router} from "express";
import {register,login} from "../controllers/user.controllers.js"

const userRouter = Router();

userRouter.route("/").post(register);
userRouter.route("/login").post(login);

export default userRouter;