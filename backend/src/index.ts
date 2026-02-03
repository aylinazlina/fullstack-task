import express from 'express' ;
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./database/db";

import authRoutes from "./routes/auth.routes";
import {seedAdmin} from './utils/seedAdmin';




dotenv.config();
console.log("Checking ENV:", process.env.MONGODB_URI); // Add this

const app= express();
app.use(cors());
app.use(express.json());

connectDB();
seedAdmin();
app.get("/",(req,res)=>{
    res.send("Server is running !!");

});

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.use("/auth",authRoutes);

