import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});

const PORT = process.env.PORT;
const db_uri = process.env.MONGODB_URI;


export {PORT,db_uri};