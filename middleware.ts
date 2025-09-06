import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

// Stop Middleware running on static files and public paths
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
