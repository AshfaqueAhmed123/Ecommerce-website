import {Schema,model} from "mongoose";

const userSchema = new Schema({
    fullName:{
        type:String,
        max:200,
        min:5,
        required:[true,"fullName is required"]
    },
    username:{
        type:String,
        max:200,
        min:5,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    phoneNumber:{
        type:Number,
    },
    password:{
        type:String,
        min:6,
        max:18,
        required:[true,"password is required"]
    },
    interests:["sports","shopping","outing","gaming","reading","exercise","coding","cooking"],
    shippingAddress:{
        type:String,
        min:20,
        max:200,
        required:[true,"shipping address is required"]
    },
},{
    timestamps:true
});

export const User = model('User', userSchema);