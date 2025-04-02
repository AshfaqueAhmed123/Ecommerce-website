import {Router} from "express";
import {register} from "../controllers/user.controllers.js"

const userRouter = Router();

userRouter.route("/").post(register);

export default userRouter;