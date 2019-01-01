import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// 연결
mongoose.connect(
    process.env,MONGO_URL,{
    useNewUrlParser: true,
    useFindAndModify: false,
})

const db = mongoose.connection;
const handleOpen = () => console.log('Connected to db')
const handleError = (error) => console.log(`Error on DB Connection: ${error}`)
db.once("open", handleOpen);
db.on("error", handleError);

