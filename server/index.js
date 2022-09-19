import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
// import dotenv from "dotenv"
import postRoutes from "./routes/posts.js"  
import userRoutes from "./routes/users.js"  

const app = express();
// dotenv.config();

app.use (bodyParser.json({ limit: "30mb", extended:true}));
app.use (bodyParser.urlencoded({ limit: "30mb", extended:true}));
app.use(cors());

app.use("/posts",postRoutes);
app.use("/user",userRoutes);

const CONNECTION_URL="mongodb+srv://santosh:santy3231@cluster0.sdgzhrg.mongodb.net/?retryWrites=true&w=majority"
const PORT =process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>app.listen(PORT,()=>console.log(`server running on the port  ${PORT}`)))
.catch((err)=>console.log(err.message));

