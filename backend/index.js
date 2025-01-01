import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRoute from "./routes/users.js";
import cors from 'cors';
const app = express();
dotenv.config()

const connect =async  () =>{

try{
    await mongoose.connect(process.env.MONGO)
    console.log("connected to mongodb")
}catch(error){
    throw error;
}
};
mongoose.connection.on("disconnected",()=>{
    console.log("disconnected from mongodb")
})
app.use(cors())
app.use(express.json());

app.use("/api/users", usersRoute)


app.use((err,req, res, next) =>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

const port = 8000;

app.listen(port,()=>{
    connect();
    console.log(`server is running at ${port}`);
})