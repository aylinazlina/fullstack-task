import {Router} from "express" ;
import {createProject,getProjects,updateProject,deleteProject} from "../controllers/project.controller";

import {protect} from "../middlewares/auth.middleware";
import {isAdmin} from "../middlewares/role.middleware";


const projectRoutes= Router();

projectRoutes.post("/create-project",protect,createProject);
projectRoutes.get("/get-projects",protect,getProjects);
projectRoutes.patch("/update-project/:id",protect,isAdmin,updateProject);
projectRoutes.delete("/delete-project/:id",protect,isAdmin,deleteProject);



export default projectRoutes;



