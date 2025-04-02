import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.utils.js";
import {ApiResponse} from "../utils/ApiResponse.utils.js";
import bcrypt from "bcrypt";

const register = async (req,res) => {
    try {
        const {fullName,username,email,password,phoneNumber,interests,shippingAddress} = req.body;
        const duplicateUser = await User.findOne({username,email});
        if(duplicateUser){
            return res.status(400).json(
                new ApiError(400,"user with this email or username already exists in our system")
            )
        }
        const hashedPass = await bcrypt.hash(password,10);
        const user = await User.create({
            fullName,username,email,password:hashedPass,phoneNumber,interests,shippingAddress
        });
        if(!user){
            return res.status(500).json(
                new ApiError(500, "error registering user")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "user registered sucessfully", user)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {register}