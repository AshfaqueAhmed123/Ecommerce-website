import mongoose,{Schema,model} from "mongoose";

const cartSchema = new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true, 'product id is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, 'user id is required']
    },
},{timestamps:true});

export const Cart = model("Cart", cartSchema);