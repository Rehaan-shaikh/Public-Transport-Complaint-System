"use server";

import { ContactEmailTemplate, StatusUpdateEmailTemplate } from "@/Elements/mail/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(prevState, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const { data, error } = await resend.emails.send({
      from: "Public Transport Complaint System <onboarding@resend.dev>",
      to: process.env.SUPER_ADMIN_EMAIL,
      subject: `New message: ${subject}`,
      react: (
        <ContactEmailTemplate
          name={name}
          email={email}
          subject={subject}
          message={message}
        />
      ),
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function sendStatusUpdateEmail(complaint, status){
      const { data, error } = await resend.emails.send({
      from: "Public Transport Complaint System <onboarding@resend.dev>",
      // to: complaint.contactEmail, // ✅ directly from complaint, not process.env
      //But it requires to buy a paid plan of resend , so for testing purpose I am using my email
      to: process.env.SUPER_ADMIN_EMAIL,
      subject: `Update on your complaint #${complaint.id}`,
      react: (
        <StatusUpdateEmailTemplate
          complaint={complaint}
          status={status}
        />
      ),
    });

    if (error) {
      console.error("Resend email error:", error);
    }
}
