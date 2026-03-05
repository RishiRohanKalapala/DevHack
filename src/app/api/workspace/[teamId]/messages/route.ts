import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-utils";

export async function GET(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { teamId } = await params;

    // Check if user is a member of the team
    const member = await prisma.teamMember.findFirst({
        where: {
            teamId,
            userId
        }
    });

    if (!member) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const messages = await prisma.message.findMany({
        where: { teamId },
        orderBy: { createdAt: "asc" },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

    return NextResponse.json(messages);
}

export async function POST(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { teamId } = await params;

    const { content } = await req.json();
    if (!content || !content.trim()) {
        return NextResponse.json({ message: "Content required" }, { status: 400 });
    }

    // Check membership
    const member = await prisma.teamMember.findFirst({
        where: {
            teamId,
            userId
        }
    });

    if (!member) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const message = await prisma.message.create({
        data: {
            teamId,
            userId,
            content
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

    return NextResponse.json(message, { status: 201 });
}
