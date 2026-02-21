import { randomBytes } from "crypto";
import { RequestHandler } from "express";
import Invite from "../models/Invite";
import { sendInviteEmail } from "../utils/sendEmails";

export const createInvite: RequestHandler = async (req, res) => {
  try {
    const { email, role } = req.body;

    const token = randomBytes(32).toString("hex");

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await Invite.create({
      email,
      role,
      token,
      expiresAt,
    });

    await sendInviteEmail(email, token);

    res.status(201).json({
      message: "Invite sent successfully via email",
    });

  } catch (error) {
    console.error(error);
    res.status
}
}