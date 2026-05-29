import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDb } from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // frontend url
  credentials: true
}));
app.use(cookieParser());
app.use("/user",userRoutes);
app.use("/todo",todoRoutes)

async function serverStart(){
  try{
await connectDb();
app.listen(process.env.PORT,()=>{
  console.log("server start")
})
  }catch(error){
    console.log(error)
  }
}
serverStart();