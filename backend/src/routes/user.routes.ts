import {Router} from "express";
import {getUsers,updateUserRole,updateUserStatus } from "../controllers/user.controller";
import {protect} from "../middlewares/auth.middleware" ;
import {isAdmin} from "../middlewares/role.middleware" ;


const router= Router();


router.get("/" ,protect,isAdmin,getUsers);
router.patch("/:id/role",protect,isAdmin,updateUserRole);
router.patch("/:id/status",protect,isAdmin,updateUserStatus);


export default router;
