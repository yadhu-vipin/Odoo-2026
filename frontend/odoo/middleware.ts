import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signup", request.url));
  }

  try {
    const jwtString = atob(decodeURIComponent(token));
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(jwtString, secret);

    if (
      payload.role === 2 &&
      request.nextUrl.pathname !== "/dashboard/not-assingned"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/not-assingned", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/auth/signup", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};