import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
});

export const config = {
  matcher: ["/users/:path*", "/conversations/:path*", "/conversation/:path*"],
};
