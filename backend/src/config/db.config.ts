import mongoose from 'mongoose'

const init = () => mongoose.connect(process.env.MONGO_URI);


const db = mongoose.connection;
mongoose.set("strictQuery", true);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("DB connection successful!");
});

export default {init};