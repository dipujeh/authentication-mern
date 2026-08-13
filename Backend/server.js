import dns from 'dns'
dns.setServers(["1.1.1.1", "8.8.8.8"]);


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();


app.use(express.json());

app.use(cors({
  origin:"https://authentication-mern-five.vercel.app",
  credentials:true
}))

app.use(cookieParser());

app.use('/api',authRouter)



const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is started at ${port}`);
  connectDB();
});
