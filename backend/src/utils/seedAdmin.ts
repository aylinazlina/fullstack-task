import User from "../models/User" ;
import {hashPassword} from "./hash";


export const seedAdmin= async()=>{
     const adminExists = await User.findOne({role:"ADMIN"}) ; 
     if(adminExists) return ;
     const password= await hashPassword("admin123");

    await User.create({

        name: "Admin",
        email: "admin@test.com",
        password,
        role:"ADMIN",
        status:"ACTIVE",

    });

    console.log("Admin user seeded");
    

}