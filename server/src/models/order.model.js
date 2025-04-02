import mongoose , {Schema,model} from "mongoose";

const orderSchema = new Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "customer is required"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true, "product is required"]
    },
    quantity:{
        type:Number,
        required:[true, "product quantity is required"],
    },
    placeDate:{
        type: Date,
        required:[true, "order place date is required"],
    },
    shipmentDate:{
        type:Date,
        required:[true, "order shipment date is required"]
    },
    shipmentAddress:{
        type:String,
        required:[true,"shipping address is required"]
    },
    paymentMethod:{
        type:String,
        enum:["cash on delivery", "debit/credit card", "paypal", "google pay"],
        default:"cash on delivery",
    },
    status:{
        type:String,
        enum:["platform to pack", "shipped", "received", "cancelled"],
        default:"platform to pack",
    },
},{timestamps:true});

export const Order = model("Order", orderSchema);