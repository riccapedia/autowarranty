import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/favicon.ico"],
  signInUrl: "/sign-in",
});

export const config = {
  // run on everything except static files and _next
  matcher: ["/((?!_next|.*\\..*).*)"],
};
