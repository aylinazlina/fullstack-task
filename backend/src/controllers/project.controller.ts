import {Request,Response} from "express" ;
import Project from "../models/Project" ;


/**
 * POST /projects
 * todo:Any authenticated user
 */

export const createProject= async(req:Request & {user?:{userId:string}},res:Response)=>{
    try{
       const {name,description}= req.body;
       const project= Project.create({
        name,description,createdBy:req.user!.userId,
       });

       res.status(201).json({
        message:"Project created successfully",
        project
       });
}catch(error){
    res.status(500).json({message:"failed to create project"});

}

}


/**
 * POST /projects
 * Any authenticated user
 */ 


export const getProjects = async(req:Request,res:Response)=>{
        try{
            const projects = await Project.find({isDeleted:false}).sort({createdAt:-1});
            res.status(200).json({
                message:"Project fetched successfully",
                projects
            })
        }catch(error){
            res.status(500).json({
                message:"failed to fetch projects"
            })

        }
}



/**
 * PATCH/projects/:id
 * ADMIN only
 */


export const updateProject= async(req:Request,res:Response)=>{
    try{
      const project = await Project.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }
        res.status(200).json({
            message:"Project updated successfully",
            project
        })
    }catch(error){
        res.status(500).json({message:"failed to updated project"});
    }
}


/**
 * Delete /projects/:id
 * ADMIN only(Soft DELETE)
 */


export const deleteProject= async(req:Request,res:Response)=>{
    try{
       const project = await Project.findByIdAndUpdate(req.params.id,
        {isDeleted:true,
            status:"DELETED"},
            {new:true}
        );
        if(!project){
            return res.status(404).json({message:"Project not found"});

        }
        res.status(200).json({
            message:"Project deleted successfully",
            project
        })
    }catch(error){
        res.status(500).json({message:"failed to delete project"});
    }
}






