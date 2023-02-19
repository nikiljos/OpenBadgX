import express from "express";
const app = express();

import * as dotenv from "dotenv";
dotenv.config();

import db from "./db.config";
db.init();

import router from "./routers/index";

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
