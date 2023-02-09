import express from "express";
const app = express();
import router from "./routers/index";

app.use(router);

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
