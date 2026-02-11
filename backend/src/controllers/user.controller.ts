import {Request,Response} from "express" ;
import User from "../models/User" ;

/**
 * todo:Get /users (ADMIN)
 * Pagination supported
 */



export const getUsers = async(req:Request,res:Response)=>{

try{


    const page = Number(req.query.page) || 1 ;
    const limit = Number(req.query.limit) || 10 ;
    const skip = (page -1) * limit;

  const  users = await User.find().select("-password").skip(skip).limit(limit).sort({createdAt:-1});

 const total = await User.countDocuments();

 res.json({
    page,
    total,
    users,

 });

}catch(error){
    res.status(500).json({
        message:"Failed to fetch users"
    });
}


}



export const updateUserRole = async(req:Request,res:Response)=>{
    try{
     const {role} =  req.body;

    const user= await User.findByIdAndUpdate(req.params.id,
        {role},{new:true},
     ).select("-select");
    

    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    res.json({message:"Role updated",user});

    }catch(error){
        res.status(500).json({ message: "Failed to updated role"});
    }
};


export const updateUserStatus=async(req:Request,res:Response)=>{
    try{
       const {status}= req.body;

    const user = await User.findByIdAndUpdate(req.params.id,
        {status},
        {new:true}
       ).select("-password");

       if(!user){
        return res.status(404).json({message:"User not found"});
       }

       res.json({message:"Status updated",user});


    }catch(error){

        res.status(500).json({
            message:"Failed to update status"
        })

    }
}
