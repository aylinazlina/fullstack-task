import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import Invite from "../models/Invite";
import { hashPassword } from "../utils/hash";

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

// export const registerViaInvite= async(req:Request,res:Response)=>{
//    try{
//    const  {token,name,password}= req.body;
//    const invite = await Invite.findOne({token});
//    if(!invite){
//      return res.status(400).json({
//       message:"Invalid invite token"
//      })
//     }
//     if(invite.expiresAt < new Date()){
//       return res.status(400).json({message:"Invite already used"});
//     }

//    const hashedPassword = await hashPassword(password);

//    //todo:Create user
//    const user = await User.create({
//       name,
//       email:invite.email,
//       password:hashedPassword,
//       role:invite.role,
//       invitedAT: new Date(),
//       status: "ACTIVE",
//      })
//      //todo:Mark invite as accepted
//      invite.acceptedAt =new Date();
//      await invite.save();
//      return res.status(201).json({
//       message: "User registered successfully"
//      });

//    }
//    catch(error){
//      return res.status(500).json({message:"Registration failed"});
//    }
// }

export const registerViaInvite = async (req: Request, res: Response) => {
  try {
    const { token, name, password } = req.body;

    //todo: 1. Find the invite
    console.log("Searching for token:", req.body.token);
    const invite = await Invite.findOne({ token: req.body.token });
    console.log("Invite found:", invite);

    //todo: If no invite is found, this is where your current error triggers
    if (!invite) {
      return res.status(404).json({ message: "Invalid invite token" });
    }

    // todo: 2. Check if already accepted
    if (invite.acceptedAt) {
      return res.status(400).json({ message: "Invite has already been used" });
    }

    //todo: 3. Check for expiration
    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invite has expired" });
    }

    //todo: 4. Hash password and Create User (Added await here!)
    const hashedPassword = await hashPassword(password);

    // Replace the User.create block with this:
    await User.create({
      name,
      email: invite.email,
      password: hashedPassword,
      role: invite.role,
      invitedAT: new Date(), // Match your User model's exact naming (invitedAT)
      status: "ACTIVE",
    });

    // 5. Mark invite as used
    invite.acceptedAt = new Date();
    await invite.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration Error:", error); // Log the error for debugging
    return res.status(500).json({ message: "Registration failed" });
  }
};
