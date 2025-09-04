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
