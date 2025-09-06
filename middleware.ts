import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (no auth needed)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/favicon(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // Allow public routes through without auth
  if (isPublicRoute(req)) return;

  // For any other route, require authentication
  auth().protect({
    unauthorizedUrl: "/sign-in",
  });
});

export const config = {
  // run on everything except static files and /_next
  matcher: ["/((?!_next|.*\\..*).*)"],
};
