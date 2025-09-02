import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/complaints"];

export async function middleware(req) {
  const isAuth = req.cookies.get("auth"); // token or flag set on login

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!isAuth) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware to specific routes only
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/complaints/:path*"],
};
