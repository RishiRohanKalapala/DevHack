import { cookies } from "next/headers";

export async function getUserId() {
    const cookieStore = await cookies();
    return cookieStore.get("userId")?.value;
}

export async function setUserId(userId: string) {
    const cookieStore = await cookies();
    cookieStore.set("userId", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 1 week
    });
}

export async function removeUserId() {
    const cookieStore = await cookies();
    cookieStore.delete("userId");
}
