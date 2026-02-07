import {Request,Response,NextFunction} from "express" ;
import jwt from "jsonwebtoken";

interface JwtPayload{
    userId:string;
    role:string;
}

export const protect = (req:Request & {user?: JwtPayload},res:Response,next:NextFunction)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json
    }


    try{ 
        const token = authHeader.split("")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"Invalid token"
        })

    }



};