import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});

const PORT = process.env.PORT;
const db_uri = process.env.MONGODB_URI;
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY=process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIARY=process.env.REFRESH_TOKEN_EXPIARY;

export {PORT,db_uri,ACCESS_TOKEN_SECRET,ACCESS_TOKEN_EXPIRY,REFRESH_TOKEN_SECRET,REFRESH_TOKEN_EXPIARY};