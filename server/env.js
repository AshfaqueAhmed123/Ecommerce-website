import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});

const PORT = process.env.PORT;
const db_uri = process.env.MONGODB_URI;
const ACCESS_TOEKN_SECRET=process.env.ACCESS_TOEKN_SECRET;
const ACCESS_TOKEN_EXPIARY=process.env.ACCESS_TOKEN_EXPIARY;

export {PORT,db_uri,ACCESS_TOEKN_SECRET,ACCESS_TOKEN_EXPIARY};