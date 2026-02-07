import {Response,NextFunction} from "express";

export const isAdmin = (req:any, res:Response,next:NextFunction)=>{
   if(req.user?.role !== "ADMIN "){
     return res.status(403).json({
        message: "Admin access only"
     });
   }

   next();


}