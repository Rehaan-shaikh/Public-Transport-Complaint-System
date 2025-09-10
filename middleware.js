import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const publicRoutes = ["/", "/login", "/sign-up", "/about", "/contact"];

async function getUserFromToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  // console.log("token in middleware:", token);  //properly logging token
  
  const { pathname } = req.nextUrl;

  const user = token ? await getUserFromToken(token) : null;
  // console.log("user in middleware:", user);  //coming as null


  // Admin restriction
  if (user?.role === "admin") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  } else {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
    // Public routes → always allow
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

    // If no user → redirect to login
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
  runtime: "nodejs", // ensure node runtime
};
