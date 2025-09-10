"use client";

import { useActionState, useEffect, useState } from "react";
import { loginUser } from "@/Actions/User";
import { requestPasswordReset, resetPassword } from "@/Actions/Reset-Pass";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader, Loader2, Loader2Icon } from "lucide-react";

export default function LoginPage() {
  const { theme } = useTheme();
  const router = useRouter();

  // ---------------- Auth Login ----------------
  const [state, formAction, pending] = useActionState(loginUser, {
    success: false,
    errors: {},
  });

useEffect(() => {
  if (state?.success) {
    toast.success("Logged in Successfully 🎉", {
      description: state.message || "Logged in user.",
      className: "bg-[#185b30] text-white",
    });
    router.push("/");
  } else if (state?.errors && Object.keys(state.errors).length > 0) {
    const errorMsg =
      state.errors.message || // custom server error
      state.errors.email ||   // email validation
      state.errors.password || // password validation
      "Sign-in failed";        // fallback

    toast.error(errorMsg, {
      className: "bg-[#b53030] text-white", // red background for errors
    });
  }
}, [state, router]);


  // ---------------- Forgot Password Flow ----------------
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  // Step 1 → requestPasswordReset
  const [resetReqState, resetReqAction, resetReqPending] = useActionState(
    requestPasswordReset,
    { success: false, error: null }
  );

  useEffect(() => {
    if (resetReqState.success) {
      toast.success("OTP sent to your email 📩", {
        description: "Please check your inbox.",
        className: "bg-[#185b30] text-white",
      });
      setShowEmailDialog(false);
      setShowOtpDialog(true);
    } else if (resetReqState.error) {
      toast.error("Failed to send OTP", {
        description: resetReqState.error,
        className: "bg-[#185b30] text-white",
      });
    }
  }, [resetReqState]);

  // Step 2 → resetPassword
  const [resetState, resetAction, resetPending] = useActionState(
    resetPassword,
    {
      success: false,
      error: null,
    }
  );

  useEffect(() => {
    if (resetState.success) {
      toast.success("Password reset successfully 🎉", {
        description: "You can now log in with your new password.",
        className: "bg-[#185b30] text-white",
      });
      setShowOtpDialog(false);
    } else if (resetState.error) {
      toast.error("Password reset failed", {
        description: resetState.error,
        className: "bg-[#185b30] text-white",
      });
    }
  }, [resetState]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-sm md:max-w-2xl">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="w-full border-0 overflow-hidden rounded-2xl shadow-xl"
        >
          <Card className="overflow-hidden border-0 bg-transparent">
            <CardContent className="grid md:grid-cols-2">
              {/* ✅ Login Form */}
              <form action={formAction} className="p-5 md:p-6">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-extrabold tracking-tight">
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
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        onClick={() => setShowEmailDialog(true)}
                        className="ml-auto text-xs underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="rounded-xl h-10"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-xl h-10 bg-[#185b30] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#1e6d3a] active:scale-95"
                  >
                    {pending ? (
                      <span className="flex items-center gap-2 animate-pulse">
                        Logging <Loader2 className="h-4 w-4 animate-spin" />
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>

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
                        href="/#"
                        className="underline underline-offset-2 hover:text-[#185b30]"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/#"
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

      {/* ---------------- Forgot Password Dialog ---------------- */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="p-0 bg-transparent border-0 shadow-none">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="w-full max-w-md border-0 overflow-hidden rounded-2xl shadow-2xl"
          >
            <Card className="overflow-hidden border-0 bg-transparent">
              <CardContent className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center mb-2">
                    Reset your password
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground text-center">
                    Enter your email to receive a one-time password (OTP)
                  </p>
                </DialogHeader>

                <form action={resetReqAction} className="space-y-5 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="rounded-xl h-10"
                    />
                  </div>

                  <DialogFooter className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={resetReqPending}
                      className="w-full rounded-xl h-10 bg-[#185b30] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#1e6d3a] active:scale-95"
                    >
                      {resetReqPending ?<> (
                        <span className="animate-pulse"> <Loader2/> Sending OTP</span>
                      ) </>: (
                        "Send OTP"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </CardContent>
            </Card>
          </MagicCard>
        </DialogContent>
      </Dialog>

      {/* ---------------- OTP + New Password Dialog ---------------- */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="p-0 bg-transparent border-0 shadow-none">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="w-full max-w-md border-0 overflow-hidden rounded-2xl shadow-2xl"
          >
            <Card className="overflow-hidden border-0 bg-transparent">
              <CardContent className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center mb-2">
                    Enter OTP & New Password
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground text-center">
                    Please check your email for the 6-digit OTP
                  </p>
                </DialogHeader>

                <form action={resetAction} className="space-y-5 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="rounded-xl h-10"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      required
                      className="rounded-xl h-10 tracking-[0.3em] text-center font-bold"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="rounded-xl h-10"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="rounded-xl h-10"
                    />
                  </div>

                  <DialogFooter className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground text-center">
                      <b>NOTE:</b> This OTP is valid for only{" "}
                      <span className="text-red-500">2 minutes</span>.
                    </p>
                    <Button
                      type="submit"
                      disabled={resetPending}
                      className="w-full rounded-xl h-10 bg-[#185b30] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#1e6d3a] active:scale-95"
                    >
                      {resetPending ? <>(
                        <span className="animate-pulse"> <span> <Loader2 /> </span> Resetting </span>
                      ) </>: (
                        "Reset Password"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </CardContent>
            </Card>
          </MagicCard>
        </DialogContent>
      </Dialog>
    </div>
  );
}
