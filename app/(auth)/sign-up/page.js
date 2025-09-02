"use client";

import { useActionState, useEffect } from "react";
import { signupUser } from "@/Actions/User";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "next-themes";
import { GithubSignIn } from "@/Elements/github-sign-in";
import { MagicCard } from "@/components/magicui/magic-card";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(signupUser, {
    success: false,
    errors: {},
  });

  // ✅ Show toast on state change
  useEffect(() => {
    if (state?.success) {
      toast.success("Account created 🎉", {
        description: state.message || "You can now log in.",
        className: "bg-[#185b30] text-white",
      });
      router.push("/login");
    } else if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Signup failed", {
        description: "Please check your details and try again.",
        className: "bg-[#185b30] text-white",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted px-4 py-6">
      <div className="w-full max-w-sm md:max-w-2xl">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="w-full border-0 overflow-hidden rounded-2xl shadow-xl"
        >
          <Card className="overflow-hidden border-0 bg-transparent p-0 ">
            <CardContent className="grid p-0 md:grid-cols-2">
              
              {/* ✅ Signup Form */}
              <form action={formAction} className="p-5 md:p-6">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-extrabold tracking-tight">
                      Create Account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Join us and start your journey
                    </p>
                  </div>

                  {/* Username */}
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" required placeholder="your name"/>
                    {state.errors?.username && (
                      <p className="text-red-500 text-xs">{state.errors.username}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                    {state.errors?.email && (
                      <p className="text-red-500 text-xs">{state.errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input placeholder="••••••••" id="password" name="password" type="password" required />
                    {state.errors?.password && (
                      <p className="text-red-500 text-xs">{state.errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      placeholder="••••••••"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                    />
                    {state.errors?.confirmPassword && (
                      <p className="text-red-500 text-xs">{state.errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl h-10 bg-[#185b30] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#1e6d3a] active:scale-95"
                    disabled={pending}
                  >
                    {pending ? "Signing Up..." : "Sign Up"}
                  </Button>

                  {/* Divider */}
                  <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
                    <span className="bg-card relative z-10 px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <GithubSignIn className="rounded-xl h-10 transition-transform duration-200 hover:scale-105" />
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full h-10 flex items-center justify-center rounded-xl transition-transform duration-200 hover:scale-105"
                    >
                      <FcGoogle className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>

                  {/* ✅ Bottom Info */}
                  <div className="text-center text-xs text-muted-foreground space-y-2 mt-4">
                    <p>
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-medium text-[#185b30] hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                    <p>
                      By clicking continue, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="underline underline-offset-2 hover:text-[#185b30]"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="underline underline-offset-2 hover:text-[#185b30]"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </form>

              {/* ✅ Right-side Image */}
              <div className="relative hidden md:block w-full h-full">
                <Image
                  src="/login.jpg"
                  alt="Signup Illustration"
                  fill
                  className="object-cover rounded-r-2xl dark:brightness-[0.5]"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        </MagicCard>
      </div>
    </div>
  );
}
