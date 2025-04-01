import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import app from "./src/app.js"

const PORT = process.env.PORT;

app.listen(PORT,()=> console.log(`Server is listening at PORT ${PORT}`));
