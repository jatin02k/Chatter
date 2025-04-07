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
import path from 'path';


dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve();

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

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

server.listen(PORT,()=>{
    console.log('The server is live on PORT:'+ PORT);
    connectDB()
});
