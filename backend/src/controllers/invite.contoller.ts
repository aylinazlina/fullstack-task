import {Request,Response} from "express";
import Invite from "../models/Invite";
import crypto, { randomBytes } from "crypto";
 
export const createInvite= async(req:Request,res:Response)=>{
    try{

        const {email,role}= req.body;
        //todo:Generate token
        const token= randomBytes(32).toString("hex");

        //todo:set expiry(24hours)

        const expiresAt= new Date();
       expiresAt.setHours(expiresAt.getHours() + 24);

       //todo:save invite db

        const invite= await Invite.create({
        email,
        role,
        token,
        expiresAt,
       });
    

       //todo:return invite token(email simulation)

       res.status(201).json({
        message:"Invite created successfully",
        inviteLink:`http://localhost:3000/register?token=${token}`,
        invite,
       });
    
    }catch(error){
        return res.status(500).json({
            message:"Invite creation failed"
        })
    }
}