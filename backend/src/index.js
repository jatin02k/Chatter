// const express = require(express);
import express from 'express'
import authRoutes from '../src/routes/auth.route.js'
import messageRoutes from '../src/routes/message.route.js'
import dotenv from "dotenv";
import { connectDB } from "../src/lib/db.js";
import { app, server } from "../src/lib/socket.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from "body-parser";

dotenv.config()
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
app.use('/api/messages',messageRoutes);

server.listen(PORT,()=>{
    console.log('The server is live on PORT:'+ PORT);
    connectDB()
});
