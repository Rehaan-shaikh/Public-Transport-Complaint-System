"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/Actions/User"; // clears cookie
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function LoginLogoutClient({ isLoggedIn }) {
  const handleLogout = async () => {
    try {
      if (isLoggedIn) {
        await signOut({ redirect: false }); // end NextAuth session
      }
    } finally {
      await logoutUser(); // always clear custom cookie/session
      window.location.href = "/"; // manual redirect
    }
  };

  const MotionButton = motion(Button);

  if (isLoggedIn) {
    return (
      <MotionButton
        variant="outline"
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Logout
      </MotionButton>
    );
  }

  return (
    <MotionButton
      variant="outline"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.90 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <a href="/login">Login</a>
    </MotionButton>
  );
}
