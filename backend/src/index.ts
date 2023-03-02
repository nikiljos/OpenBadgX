import express from "express";
const app = express();
import "express-async-errors";
import cors from "cors"

import * as dotenv from "dotenv";
dotenv.config();

import db from "./db.config";
db.init();

import router from "./routers/index";
import errorHandler from "./middlewares/error.middleware";

app.use(cors())
app.use(router);
app.use(errorHandler)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
