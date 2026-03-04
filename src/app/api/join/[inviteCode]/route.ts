import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ inviteCode: string }> }
) {
    try {
        const { inviteCode } = await params;
        const team = await prisma.team.findUnique({
            where: { inviteCode },
            select: {
                id: true,
                name: true,
                projectName: true,
            }
        });

        if (!team) {
            return NextResponse.json(
                { message: "Team not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(team);
    } catch (error: any) {
        console.error("Join discovery error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ inviteCode: string }> }
) {
    try {
        const { inviteCode } = await params;
        const { userId } = await req.json(); // Temporary: in real app, get from session

        if (!userId) {
            return NextResponse.json({ message: "UserId is required" }, { status: 400 });
        }

        const team = await prisma.team.findUnique({
            where: { inviteCode }
        });

        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        // Check if already a member
        const existingMember = await prisma.teamMember.findUnique({
            where: {
                teamId_userId: {
                    teamId: team.id,
                    userId: userId
                }
            }
        });

        if (existingMember) {
            return NextResponse.json({ message: "Already a member" }, { status: 400 });
        }

        // Create join request
        const request = await prisma.joinRequest.create({
            data: {
                teamId: team.id,
                userId: userId,
                status: "PENDING"
            }
        });

        return NextResponse.json({ message: "Join request sent", requestId: request.id });
    } catch (error: any) {
        console.error("Join request error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
