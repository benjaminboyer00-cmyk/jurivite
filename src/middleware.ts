import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, search } = req.nextUrl;

  if (
    !isLoggedIn &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))
  ) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
