import express from 'express' ;
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./database/db";

import authRoutes from "./routes/auth.routes";
import {seedAdmin} from './utils/seedAdmin';
import inviteRoutes from "./routes/invite.routes";

import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes" ;




dotenv.config();
console.log("Checking ENV:", process.env.MONGODB_URI); // Add this

const app= express();
app.use(cors());
app.use(express.json());


//todo:Databse and seeding
connectDB();
seedAdmin();


//todo:routes

app.use("/auth",authRoutes);
app.use("/auth/invite",inviteRoutes );
app.use("/users",userRoutes);
app.use("/projects" ,projectRoutes);



app.get("/",(req,res)=>{
    res.send("Server is running !!");

});

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});










