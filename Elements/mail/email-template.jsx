import * as React from "react";

export function ContactEmailTemplate({ name, email, subject, message }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h2 style={{ marginBottom: "10px" }}>📩 New Contact Form Message</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Subject:</strong> {subject}</p>
      <div style={{ marginTop: "15px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", backgroundColor: "#f9f9f9" }}>
        <p style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</p>
      </div>
    </div>
  );
}


export function OTPEmailTemplate({ otp }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333" }}>
      <h2 style={{ marginBottom: "10px", color: "#185b30" }}>🔐 Password Reset Request</h2>
      <p>Hello,</p>
      <p>
        We received a request to reset your password. Use the OTP below to
        proceed. This code is valid for <strong>2 minutes</strong>.
      </p>

      <div
        style={{
          margin: "20px 0",
          padding: "15px",
          border: "2px dashed #185b30",
          borderRadius: "8px",
          backgroundColor: "#f0fdf4",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "4px",
            color: "#185b30",
          }}
        >
          {otp}
        </span>
      </div>

      <p style={{ marginTop: "20px" }}>
        If you did not request this, please ignore this email. Your account is
        safe.
      </p>

      <p style={{ marginTop: "30px", fontSize: "12px", color: "#888" }}>
        © {new Date().getFullYear()} Your App Name. All rights reserved.
      </p>
    </div>
  );
}

export function StatusUpdateEmailTemplate({ complaint, status }) {
  // Format status for display
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h2 style={{ color: "#185b30" }}>Complaint Status Update</h2>
      <p>Dear {complaint.contactName || "User"},</p>

      <p>
        We are writing to inform you that the status of your complaint has been
        updated.
      </p>

      <p>
        <strong>Complaint ID:</strong> {complaint.id}
        <br />
        <strong>Description:</strong> {complaint.description}
        <br />
        <strong>Current Status:</strong>{" "}
        <span style={{ color: "#185b30", fontWeight: "bold" }}>
          {getStatusText(status)}
        </span>
      </p>

      {status === "in_progress" && (
        <p>
          Our team has started working on your complaint. We will notify you
          once it has been resolved.
        </p>
      )}

      {status === "resolved" && (
        <p>
          Your complaint has been marked as <b>resolved</b>. If you believe the
          issue still persists, please contact our support team.
        </p>
      )}

      <p>Thank you for helping us improve the public transport system.</p>

      <p style={{ marginTop: "20px" }}>
        Regards, <br />
        <b>Public Transport Complaint System</b>
      </p>
    </div>
  );
}
