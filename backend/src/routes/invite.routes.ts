import {Router} from "express";
import {createInvite} from  "../controllers/invite.contoller" ;
import {protect} from "../middlewares/auth.middleware";
import {isAdmin} from "../middlewares/role.middleware";


const router= Router();

router.post("/invite-create",protect,isAdmin,createInvite);


export default router;