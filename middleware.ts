import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/favicon.ico"],
  signInUrl: "/sign-in",
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
