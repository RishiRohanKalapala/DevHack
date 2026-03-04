import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ eventId: string }> }) {
    try {
        const { eventId } = await params;

        const timelines = await prisma.timelineEvent.findMany({
            where: { eventId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ timelines }, { status: 200 });
    } catch (error) {
        console.error("Timeline fetch error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
