import {Router} from "express" ;
import {login} from "../controllers/auth.controller"
import {registerViaInvite} from "../controllers/auth.controller" ;


const router= Router() ;
router.post("/login" ,login);
router.post("/register-via-invite",registerViaInvite);

export default router ;
