import { NextResponse } from "next/server";
import { removeUserId } from "@/lib/auth-utils";
import { removeOrganizerId } from "@/lib/organizer-auth-utils";

export async function POST() {
    try {
        await removeUserId();
        await removeOrganizerId();
        return NextResponse.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ message: "Error logging out" }, { status: 500 });
    }
}
