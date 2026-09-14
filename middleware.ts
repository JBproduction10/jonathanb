import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect every /admin route except the login page itself, and every
// /api/admin route (the API routes also double-check the session
// server-side, this just saves the round trip).
export const config = {
  matcher: ["/admin/((?!login).*)", "/api/admin/:path*"],
};
