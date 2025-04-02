import {Router} from "express";
import {create,getAll,getOne,remove,update} from "../controllers/product.controllers.js"

const productRouter = Router();

productRouter.route("/").get(getAll);
productRouter.route("/").post(create);
productRouter.route("/:productID").get(getOne);
productRouter.route("/:productID").delete(remove);
productRouter.route("/:productID").patch(update);

export default productRouter;