import {Request,Response} from "express";
import Invite from "../models/Invite";
import crypto from "crypto";
 
export const createInvite= async(req:Request,res:Response)=>{
    try{

    }catch(error){
        return res.status(500).json({
            message:"Invite creation failed"
        })
    }
}