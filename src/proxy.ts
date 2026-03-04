import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const userId = request.cookies.get("userId")?.value;
    const organizerId = request.cookies.get("organizerId")?.value;
    const { pathname } = request.nextUrl;

    // Normalize pathname (remove trailing slash except for root)
    const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

    // Public paths that don't need auth
    const publicPaths = [
        "/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/organizer/login",
        "/organizer/register"
    ];
    const isPublicPath = publicPaths.includes(normalizedPath);

    console.log(`[Proxy] Path: ${pathname} | Normalized: ${normalizedPath} | isPublic: ${isPublicPath} | userId: ${userId} | organizerId: ${organizerId}`);

    // 1. Organizer Route Protection
    if (normalizedPath.startsWith("/organizer")) {
        // If trying to access organizer dashboard/etc without organizerId
        if (!organizerId && !isPublicPath && normalizedPath !== "/organizer/onboarding") {
            console.log(`[Proxy] Redirecting organzier to login: ${normalizedPath}`);
            return NextResponse.redirect(new URL("/organizer/login", request.url));
        }
        // If logged in as organizer and trying to access login/register
        if (organizerId && (normalizedPath === "/organizer/login" || normalizedPath === "/organizer/register")) {
            console.log(`[Proxy] Redirecting logged-in organizer to dashboard`);
            return NextResponse.redirect(new URL("/organizer/dashboard", request.url));
        }
        return NextResponse.next();
    }

    // 2. Regular User Route Protection
    // If no userId and trying to access a protected path, redirect to login
    if (!userId && !isPublicPath) {
        console.log(`[Proxy] Redirecting user to login: ${normalizedPath}`);
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If userId exists and trying to access login/register, redirect to dashboard
    if (userId && (normalizedPath === "/login" || normalizedPath === "/register")) {
        console.log(`[Proxy] Redirecting logged-in user to dashboard`);
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export default proxy;

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
