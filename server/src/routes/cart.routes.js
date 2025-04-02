import {Router} from "express";
import {add,remove} from "../controllers/cart.controllers.js"

const cartRouter = Router();

cartRouter.route("/").post(add);
cartRouter.route("/:cartID").delete(remove);

export default cartRouter;