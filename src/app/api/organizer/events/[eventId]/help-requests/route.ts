import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrganizerId } from "@/lib/organizer-auth-utils";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ eventId: string }> }
) {
    try {
        const organizerId = await getOrganizerId();
        const { eventId } = await params;

        if (!organizerId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const helpRequests = await prisma.eventRegistration.findMany({
            where: {
                eventId,
                handRaised: true,
                status: "INVITED"
            },
            select: {
                id: true,
                teamName: true,
                leadEmail: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return NextResponse.json(helpRequests);
    } catch (error: any) {
        console.error("Fetch help requests error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ eventId: string }> }
) {
    try {
        const organizerId = await getOrganizerId();
        const { registrationId } = await req.json();

        if (!organizerId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await prisma.eventRegistration.update({
            where: { id: registrationId },
            data: { handRaised: false }
        });

        return NextResponse.json({ message: "Help request resolved" });
    } catch (error: any) {
        console.error("Resolve help request error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
