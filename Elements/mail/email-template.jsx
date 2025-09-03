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
