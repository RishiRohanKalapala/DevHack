import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const userId = request.cookies.get("userId")?.value;
    const { pathname } = request.nextUrl;

    // Public paths that don't need auth
    const publicPaths = ["/", "/login", "/register"];
    const isPublicPath = publicPaths.includes(pathname);

    // If no userId and trying to access a protected path, redirect to login
    if (!userId && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If userId exists and trying to access login/register, redirect to dashboard
    if (userId && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
