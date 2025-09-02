"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/Actions/User"; // adjust path

export default function LoginLogout({ user }) {
  const handleLogout = async () => {
    await logoutUser(); // call server action
    window.location.href = "/"; // redirect to home after logout
  };

  if (user) {
    return (
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    );
  }

  return (
    <Button>
      <a href="/login">Login</a>
    </Button>
  );
}
