import express from "express";

const app = express();

app.use(express.json({
    limit:"16kb"
}));
app.use(express.urlencoded({
    extends:true,
    limit:"16kb"
}));

// routes
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/product",productRouter)
app.use("/api/v1/user",userRouter)


export default app;