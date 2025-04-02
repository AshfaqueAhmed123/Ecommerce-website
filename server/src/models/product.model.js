import {Schema,model} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        min:5,
        max:200,
        required:[true,"product name is required"]
    },
    category:{
        type:String,
        enum:["coding","cooking","electronics","cosmetics","waering","toys"],
    },
    price:{
        type:String,
        required:[true,"product price is required"]
    },
    showcasePictures:[{
        type:String,
    }],
    discount:{
        type:String,
    },
},{
    timestamps:true
})

export const Product = model("Product",productSchema);
