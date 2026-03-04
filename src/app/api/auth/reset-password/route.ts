import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: "Missing token or password" },
                { status: 400 }
            );
        }

        // Find user by valid unexpired token
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gt: new Date() // Token expiration must be greater than current time
                }
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired reset token" },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });

        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
