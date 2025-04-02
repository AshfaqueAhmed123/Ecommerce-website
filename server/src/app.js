import express from "express";

const app = express();

app.use(express.json({
    limit:"16kb"
}));
app.use(express.urlencoded({
    extends:true,
    limit:"16kb"
}));

app.get("/",(req,res)=>{
    res.json({message:"Hello"})
})

export default app;