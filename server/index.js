import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import app from "./src/app.js"
import connectDB from "./src/db/db.connection.js"

const PORT = process.env.PORT;
import {db_name} from "./constants.js"

connectDB(process.env.MONGODB_URI,db_name).then(()=>{
    app.listen(PORT,()=> console.log(`Server is listening at PORT ${PORT}`));
}).catch((error)=>{
    console.error(error)
})
