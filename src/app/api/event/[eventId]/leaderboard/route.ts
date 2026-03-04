import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ eventId: string }> }) {
    try {
        const { eventId } = await params;

        const event = await prisma.hackathonEvent.findUnique({
            where: { id: eventId },
            include: {
                registrations: {
                    where: { status: "INVITED" } // Only show teams that are actually participating
                }
            }
        });

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        const teamNames = event.registrations.map(r => r.teamName);

        // Fetch corresponding actual workspace teams to calculate their live progress scores
        const actualTeams = await prisma.team.findMany({
            where: { name: { in: teamNames } },
            include: {
                tasks: true,
                submission: true,
                members: true
            }
        });

        const leaderboard = event.registrations.map(reg => {
            const actualTeam = actualTeams.find(t => t.name === reg.teamName);
            let score = 0;
            let tasksCompleted = 0;
            let hasSubmission = false;

            if (actualTeam) {
                // Assign 10 points for every completed task
                const doneTasks = actualTeam.tasks.filter(t => t.status === "DONE").length;
                tasksCompleted = doneTasks;
                score += doneTasks * 10;

                // Assign 50 points if they have submitted their project
                if (actualTeam.submission) {
                    hasSubmission = true;
                    score += 50;
                }
            }

            return {
                id: reg.id,
                teamName: reg.teamName,
                score,
                tasksCompleted,
                hasSubmission,
                joinedAt: reg.createdAt,
            };
        });

        // Sort descending by score. If tied, sort by earliest joined
        leaderboard.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
        });

        // Map the sorted array to apply the rank
        const rankedLeaderboard = leaderboard.map((team, index) => ({
            ...team,
            rank: index + 1
        }));

        return NextResponse.json({ leaderboard: rankedLeaderboard }, { status: 200 });
    } catch (error) {
        console.error("Leaderboard fetch error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
