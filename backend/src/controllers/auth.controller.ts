import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import Invite from "../models/Invite";
import {hashPassword} from "../utils/hash";


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Check status
    if (user.status === "INACTIVE") {
      return res.status(403).json({ message: "User is inactive" });
    }

    // 3. Compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate token
    const token = generateToken(user._id.toString(), user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};


export const registerViaInvite= async(req:Request,res:Response)=>{
   try{
   const  {token,name,password}= req.body;
   const invite = await Invite.findOne({token});
   if(!invite){
     return res.status(400).json({
      message:"Invalid invite token"
     })
    }
    if(invite.expiresAt < new Date()){
      return res.status(400).json({message:"Invite already used"});
    }

   const hashedPassword = await hashPassword(password);
     User.create({
      name,
      email:invite.email,
      password:hashedPassword,
      role:invite.role,
      invitedAT: new Date(),
      status: "ACTIVE",
     })
     invite.acceptedAt =new Date();
     await invite.save();
     return res.status(201).json({
      message: "User registered successfully"
     });

   }
   catch(error){
     return res.status(500).json({message:"Registration failed"});
   }
}
