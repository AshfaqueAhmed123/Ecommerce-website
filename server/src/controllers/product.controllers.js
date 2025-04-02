import {Product} from "../models/product.model.js";
import {ApiResponse} from "../utils/ApiResponse.utils.js"
import {ApiError} from "../utils/ApiError.utils.js"

const create = async (req,res) => {
    try {
        const {name,category,price,showcasePictures,discount} = req.body;
        if(!name || !category || !price || !showcasePictures){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const duplicateProduct = await Product.findOne({name});
        if(duplicateProduct){
            return res.status(400).json(
                new ApiError(400,"product with this name already exists")
            )
        }
        const product = await Product.create({
            name,category,price,showcasePictures,discount
        });
        if(!product){
            return res.status(500).json(
                new ApiError(500,"error creating product")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"product created sucessfully",product)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const getAll = async (req,res) => {
    try {
        const products = await Product.find();
        if(!products){
            return res.status(500).json(
                new ApiError(500,"error fetching products")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"all products fetched sucessfully!", products)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const getOne = async (req,res) => {
    try {
        const productID = req.params.productID;
        if(!productID){
            return res.status(400).json(
                new ApiError(400,"product id is required")
            )
        }
        const product = await Product.findById(productID);
        if(!product){
            return res.status(404).json(
                new ApiError(404,"no product found with this id")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"product fetched successfully!", product)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )   
    }
}

const remove = async (req,res) => {
    try {
        const productID = req.params.productID;
        if(!productID){
            return res.status(400).json(
                new ApiError(400,"product id is required")
            )
        }
        const deletedProduct = await Product.findByIdAndDelete(productID)
        if(!deletedProduct){
            return res.status(500).json(
                new ApiError(500, "error while deleting product")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "product deleted sucessfully!", deletedProduct)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const update = async (req,res) => {
    try {
        const productID = req.params.productID;
        if(!productID){
            return res.status(400).json(
                new ApiError(400,"product id is required")
            )
        }
        const {name,category,price,showcasePictures,discount} = req.body;
        if(!name || !category || !price || !showcasePictures){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const product = await Product.findById(productID)
        if(!product){
            return res.status(404).json(
                new ApiError(404,"product with this id not fonund")
            )
        }

        product.name = name;
        product.category = category;
        product.price = price;
        product.showcasePictures = showcasePictures;
        product.discount = discount;

        const updated = await product.save();

        if(!updated){
            return res.status(500).json(
                new ApiError(400, "error while editing product")
            )
        }

        return res.status(200).json(
            new ApiResponse(200,"product updated successfully!", updated)
        )

    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {create,getAll,getOne, remove,update};