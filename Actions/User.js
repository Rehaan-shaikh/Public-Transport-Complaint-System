"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Make sure to define this in your .env
const JWT_SECRET = process.env.JWT_SECRET;

// ---------------------------
// Sign Up User (with validation)
// ---------------------------

export async function signupUser(_, formData) {
  const email = formData.get("email")?.trim();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const username = formData.get("username")?.trim();

  const errors = {};

  // Basic validations
  if (!email || !email.includes("@")) {
    errors.email = "Valid email is required";
  }

  if (!username) {
    errors.username = "Username is required";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { success: false, errors: { email: "User already exists" } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name: username,
    },
  });

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}


// ---------------------------
// Login User (with validation + JWT cookie)
// ---------------------------
export async function loginUser(_, formData) {
  const session = await auth();
  if (session?.user) {
    console.log(session);
    
    const email = session.user.email;
    const name = session.user.name;

    let existingUser = await db.user.findUnique({ where: { email } });

    if (!existingUser) {
      existingUser = await db.user.create({
        data: {
          email,
          name,
        },
      });
    }
    const user = existingUser;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie
    const cookieStore = await cookies(); // ✅ updated
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60,
      path: "/",
    });

    return {
      success: true,
      message: "Logged in successfully",
    };

  } else {
    const email = formData.get("email")?.trim();
    const password = formData.get("password");

    const errors = {};

    if (!email || !email.includes("@")) {
      errors.email = "Valid email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const user = await db.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return {
        success: false,
        errors: {
          email: "Invalid email or password",
          password: "Invalid email or password",
        },
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return {
        success: false,
        errors: {
          email: "Invalid email or password",
          password: "Invalid email or password",
        },
      };
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie
    const cookieStore = await cookies(); // ✅ updated
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60,
      path: "/",
    });

    return {
      success: true,
      message: "Logged in successfully",
    };
  }
}

// ---------------------------
// Get Current User
// ---------------------------
export async function getCurrentUser() {
  const cookieStore = await cookies(); // ✅ updated
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    return user || null;
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
}

// ---------------------------
// Logout User
// ---------------------------
export async function logoutUser() {
  const cookieStore = await cookies(); // ✅ updated
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 0, // invalidate immediately
    path: "/",
  });
}
