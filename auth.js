// import { v4 as uuid } from "uuid";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth  } = NextAuth({
//   adapter,
  providers: [
    GitHub
  ],
});