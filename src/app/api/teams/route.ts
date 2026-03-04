import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { getUserId } from "@/lib/auth-utils";

export async function GET() {
    try {
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const teams = await prisma.team.findMany({
            where: {
                members: {
                    some: { userId }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                _count: {
                    select: { members: true }
                }
            }
        });

        return NextResponse.json(teams);

    } catch (error: any) {
        console.error("Fetch teams error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
