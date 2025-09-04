// auth.js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export const { handlers, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Sync user to DB
      let existingUser = await db.user.findUnique({ where: { email: user.email } });
      if (!existingUser) {
        existingUser = await db.user.create({
          data: { email: user.email, name: user.name },
        });
      }

      // Create JWT + set cookie
      const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      cookies().set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 60 * 60,
        path: "/",
      });

      return true;
    },
  },
});
