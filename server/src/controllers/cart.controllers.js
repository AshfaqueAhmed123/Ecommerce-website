import {Cart} from "../models/cart.model.js";
import {ApiError} from "../utils/ApiError.utils.js"
import {ApiResponse} from "../utils/ApiResponse.utils.js"

const add = async (req,res) => {
    try {
        const {product,user} = req.body;
        const duplicate = await Cart.findOne({product,user})
        if(duplicate){
            return res.status(400).json(
                new ApiError(400, "this product is already added in your card") 
            )
        }
        const cart = await Cart.create({product,user});
        if(!cart){
            return res.status(500).json(
                new ApiError(500, "error adding product to cart") 
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "product added to cart sucessfully!", cart)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        ) 
    }
}

const remove = async (req,res) => {
    try {
        const cartID = req.params.cartID;
        if(!cartID){
            return res.status(400).json(
                new ApiError(400, "cart id is required") 
            )
        }
        const removedCart = await Cart.findByIdAndDelete(cartID)
        if(!removedCart){
            return res.status(500).json(
                new ApiError(500, "error while removing product from cart")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "product removed from cart sucessfully", removedCart)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        ) 
    }
}

export {add,remove};