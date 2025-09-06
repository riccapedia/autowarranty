// middleware.ts (at project root, or src/middleware.ts if you use /src)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// mark your public routes here
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // allow public routes through
  if (isPublicRoute(req)) return;

  // protect everything else
  auth().protect();
});

// IMPORTANT: don't run middleware on static files like /favicon.ico, /_next, *.png, etc.
export const config = {
  matcher: [
    // Skip static files and _next
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
