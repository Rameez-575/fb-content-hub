import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/forgot-password", "/auth/verify-email"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route);
  const isApiRoute = pathname.startsWith("/api/");
  const isAuthApi = pathname.startsWith("/api/auth/");
  const isBillingWebhook = pathname === "/api/billing/webhook";

  // Allow public routes, auth APIs, and billing webhook
  if (isPublicRoute || isAuthApi || isBillingWebhook) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect API routes
  if (isApiRoute && !isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
