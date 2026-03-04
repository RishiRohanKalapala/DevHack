import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Missing email" },
                { status: 400 }
            );
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Return success even if user not found to prevent enumeration
            return NextResponse.json(
                { message: "If an account exists, a reset link has been sent." },
                { status: 200 }
            );
        }

        // Check if user is a Google OAuth user without a password
        if (!user.password && user.password !== null) {
            // If they signed up via google, they still shouldn't really reset a password, 
            // but we'll let them set one if they really want, by generating a token.
        }

        // Generate a random token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

        // Save token to database
        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires,
            },
        });

        // Send email
        const emailResult = await sendPasswordResetEmail(email, resetToken, user.name);

        if (!emailResult.success) {
            console.error("Failed to send reset email");
            return NextResponse.json(
                { message: "Failed to send reset email" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Password reset link sent to email" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
