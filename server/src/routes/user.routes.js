import {Router} from "express";
import {register,login,logout} from "../controllers/user.controllers.js"

const userRouter = Router();

userRouter.route("/").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);

export default userRouter;