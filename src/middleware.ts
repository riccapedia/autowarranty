import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Mark these as public (no auth)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/favicon(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // Let public routes through
  if (isPublicRoute(req)) return;

  // Everything else requires auth
  auth().protect({ unauthorizedUrl: "/sign-in" });
});

export const config = {
  // Run on everything except static files and /_next
  matcher: ["/((?!_next|.*\\..*).*)"],
};
