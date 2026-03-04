import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { teamName, projectName, hackathonName, teamSize, description } = await req.json();

        if (!teamName || !projectName || !hackathonName) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate a random 7-character invite code
        const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 7);

        // Create team
        const team = await prisma.team.create({
            data: {
                name: teamName,
                projectName,
                hackathonName,
                teamSize: parseInt(teamSize) || 1,
                description,
                inviteCode,
            },
        });

        // Note: In a real app, we'd also create a TeamMember record for the creator as LEAD
        // For now, we'll just return the team details

        return NextResponse.json(
            {
                message: "Team created successfully",
                teamId: team.id,
                inviteCode: team.inviteCode
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Team creation error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
