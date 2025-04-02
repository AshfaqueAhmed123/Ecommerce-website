import {Router} from "express";
import {place,cancel, updateQuantity, updateStatus} from "../controllers/order.controllers.js"

const orderRouter = Router();

orderRouter.route("/").post(place)
orderRouter.route("/:orderID").delete(cancel)
orderRouter.route("/quantity/:orderID").patch(updateQuantity)
orderRouter.route("/status/:orderID").patch(updateStatus)

export default orderRouter