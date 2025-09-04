// actions/github-signin.js
"use server";

import { signIn } from "@/auth";

export async function GithubIn() {
  await signIn("github");
}
