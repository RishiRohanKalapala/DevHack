import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrganizerId } from "@/lib/organizer-auth-utils";

export async function POST(req: Request, { params }: { params: Promise<{ eventId: string }> }) {
    try {
        const organizerId = await getOrganizerId();
        if (!organizerId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { eventId } = await params;
        const { title, time } = await req.json();

        if (!title || !time) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Verify ownership
        const event = await prisma.hackathonEvent.findUnique({
            where: { id: eventId },
        });

        if (!event || event.organizerId !== organizerId) {
            return NextResponse.json({ message: "Event not found or unauthorized" }, { status: 404 });
        }

        const timeline = await prisma.timelineEvent.create({
            data: {
                eventId,
                title,
                time: new Date(time),
            },
        });

        return NextResponse.json({ message: "Timeline added", timeline }, { status: 201 });
    } catch (error) {
        console.error("Timeline setup error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
