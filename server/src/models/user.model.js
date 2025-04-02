import mongoose, {Schema,model} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      max: 200,
      min: 5,
      required: [true, "fullName is required"],
    },
    username: {
      type: String,
      max: 200,
      min: 5,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      min: 6,
      max: 18,
      required: [true, "password is required"],
    },
    interests: {
      type: [String],
      enum: [
        "sports",
        "shopping",
        "outing",
        "gaming",
        "reading",
        "exercise",
        "coding",
        "cooking",
      ],
      default: ["other"],
    },
    shippingAddress: {
      type: String,
      min: 20,
      max: 200,
      required: [true, "shipping address is required"],
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export const User = model('User', userSchema);