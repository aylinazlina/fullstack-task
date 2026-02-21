import nodemailer from "nodemailer";

export const sendInviteEmail = async (
  to: string,
  inviteToken: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const inviteLink = `http://localhost:5173/register?token=${inviteToken}`;

  await transporter.sendMail({
    from: `"Project Manager" <${process.env.EMAIL_USER}>`,
    to,
    subject: "You're Invited to Join",
    html: `
      <h2>Invitation</h2>
      <p>You have been invited to join our platform.</p>
      <p>Click below to register:</p>
      <a href="${inviteLink}">${inviteLink}</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
};