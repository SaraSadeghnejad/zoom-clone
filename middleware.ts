
import { authMiddleware } from "@clerk/nextjs";



export default authMiddleware({ 
  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/sign-in",'/sign-up']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};