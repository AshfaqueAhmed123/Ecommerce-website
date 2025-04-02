import {Order} from "../models/order.model.js";
import {ApiError} from "../utils/ApiError.utils.js"
import {ApiResponse} from "../utils/ApiResponse.utils.js"

const place = async (req,res) => {
    try {
        const {customer,product,quantity,placeDate,shipmentDate,shipmentAddress,paymentMethod,status} = req.body;
        const duplicateOrder = await Order.findOne({customer,product})
        if(duplicateOrder){
            return res.status(400).json(
                new ApiError(400, "you have already ordered this product, Try increasing quantity if you need more!")
            )
        }
        const order = await Order.create({customer,product,quantity,placeDate,shipmentDate,shipmentAddress,paymentMethod,status})
        if(!order){
            return res.status(500).json(
                new ApiError(500, "error while placing order")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "order places sucessfully!", order)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const cancel = async (req,res) => {
    try {
        const orderID = req.params.orderID;
        if(!orderID){
            return res.status(400).json(
                new ApiError(400, "order id is required")
            )
        }
        const cancelledOrder = await Order.findByIdAndDelete(orderID);
        if(!cancelledOrder){
            return res.status(500).json(
                new ApiError(500, "error while cancelling order")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "order cancelled sucessfully")
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const updateQuantity = async (req,res) => {
    try {
        const orderID = req.params.orderID;
        const {quantity} = req.body;
        if(!orderID || !quantity){
            return res.status(400).json(
                new ApiError(400, "order id and quantity both are required")
            )
        }
        const order = await Order.findById(orderID);
        if(!order){
            return res.status(404).json(
                new ApiError(404, "order not found")
            )
        }
        order.quantity = quantity;
        const updatedOrder = await order.save();
        return res.status(200).json(
            new ApiResponse(200, "quantity updated", updatedOrder)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}


const updateStatus = async (req,res) => {
    try{
        const orderID = req.params.orderID;
        const {status} = req.body;
        if(!orderID || !status){
            return res.status(400).json(
                new ApiError(400, "order id and status both are required")
            )
        }
        const order = await Order.findById(orderID);
        if(!order){
            return res.status(404).json(
                new ApiError(404, "order not found")
            )
        }
        order.status = status;
        const updatedOrder = await order.save();
        return res.status(200).json(
            new ApiResponse(200, "status updated", updatedOrder)
        )
    }catch (error){
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {place,cancel,updateQuantity,updateStatus};