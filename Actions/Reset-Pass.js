"use server";

import crypto from "crypto";
import { Resend } from "resend";
import { OTPEmailTemplate } from "@/Elements/mail/email-template";
import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

// Action to handle password reset request
export async function requestPasswordReset(prevState, formData) {
  const email = formData.get("email");

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: "No account found with this email" };
    }

    if (user.provider !== "credentials") {
      return {
        success: false,
        error:
          "This account uses GitHub/Google login. Please sign in with that provider.",
      };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store (or replace) hashed OTP in DB with expiry (2 min)
    await db.passwordResetToken.upsert({
      where: { email },
      update: {
        token: crypto.createHash("sha256").update(otp).digest("hex"),
        expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        createdAt: new Date(),
      },
      create: {
        email,
        token: crypto.createHash("sha256").update(otp).digest("hex"),
        expiresAt: new Date(Date.now() + 2 * 60 * 1000),
      },
    });

    // Send OTP email via Resend
    const { data, error } = await resend.emails.send({
      from: "Public Transport Complaint System <onboarding@resend.dev>",
      to: email,
      subject: "🔐 Your Password Reset OTP",
      react: <OTPEmailTemplate otp={otp} />,
    });

    if (error) {
      return { success: false, error: error.message || "Failed to send OTP email" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message || "Something went wrong" };
  }
}


// Action to handle password reset submission via OTP
export async function resetPassword(prevState, formData) {
  const email = formData.get("email");
  const otp = formData.get("otp");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (newPassword !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  const tokenRecord = await db.passwordResetToken.findFirst({
    where: {
      email,
      token: hashedOtp,
    },
  });

  if(tokenRecord.expiresAt < new Date()) {
    return { success: false, error: "OTP has expired" };
}
  if (!tokenRecord) {
    return { success: false, error: "Invalid OTP" };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { email },
    data: { password: passwordHash }, // ⚡️ make sure field is "password", not "passwordHash" in your schema
  });

  await db.passwordResetToken.delete({ where: { id: tokenRecord.id } });

  return { success: true };
}

