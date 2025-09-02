"use client";

import { useActionState, useEffect } from "react";
import { loginUser } from "@/Actions/User";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GithubSignIn } from "@/Elements/github-sign-in";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(loginUser, {
    success: false,
    errors: {},
  });

    useEffect(() => {
    if (state?.success) {
      toast.success("Logged in Successfuly 🎉", {
        description: state.message || "Logged in user.",
        className: "bg-[#185b30] text-white",
      });
      router.push("/"); // Redirect to home page after login
    } else if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Sign-in failed", {
        description: "Please check your details and try again.",
        className: "bg-[#185b30] text-white",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-sm md:max-w-2xl"> {/* ✅ reduced max width */}
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="w-full border-0 overflow-hidden rounded-2xl shadow-xl"
        >
          <Card className="overflow-hidden border-0 bg-transparent">
            <CardContent className="grid md:grid-cols-2">
              
              {/* ✅ Login Form */}
              <form action={formAction} className="p-5 md:p-6"> {/* ✅ reduced padding */}
                <div className="flex flex-col gap-5"> {/* ✅ slightly tighter spacing */}
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-extrabold tracking-tight"> {/* ✅ reduced text size */}
                      Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Login to continue your journey
                    </p>
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="rounded-xl h-10"
                    />
                    {state.errors?.email && (
                      <p className="text-red-500 text-xs">{state.errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-xs underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="rounded-xl h-10"
                    />
                    {state.errors?.password && (
                      <p className="text-red-500 text-xs">{state.errors.password}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-xl h-10 bg-[#185b30] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#1e6d3a] active:scale-95"
                  >
                    {pending ? (
                      <span className="animate-pulse">Logging in...</span>
                    ) : (
                      "Login"
                    )}
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

                  {/* Bottom Info */}
                  <div className="text-center text-xs text-muted-foreground space-y-2 mt-4">
                    <p>
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/sign-up"
                        className="font-medium text-[#185b30] hover:underline"
                      >
                        Sign up
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
              <div className="relative hidden md:block rounded-2xl">
                <Image
                  src="/login.jpg"
                  alt="Login Illustration"
                  className="h-full w-full object-cover rounded-2xl dark:brightness-[0.5]"
                  width={500}
                  height={500}
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
