// const express = require(express);
import express from 'express'
import authRoutes from '../routes/auth.route.js'
import messageRoutes from '../routes/message.route.js'
import dotenv from "dotenv";
import { connectDB } from "../lib/db.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from "body-parser";

dotenv.config()
const app = express();;
const PORT = process.env.PORT

app.use(bodyParser.json({ limit: "10mb" })); 
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); 

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json({ limit: "10mb" })); // Increase limit for JSON requests


app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

app.listen(PORT,()=>{
    console.log('The server is live on PORT:'+ PORT);
    connectDB()
});
