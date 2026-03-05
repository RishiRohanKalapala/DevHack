import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Activity, Trophy, ArrowLeft } from "lucide-react";
import LiveLeaderboard from "./LiveLeaderboard";

export default async function PublicLeaderboardPage({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;

    const event = await prisma.hackathonEvent.findUnique({
        where: { id: eventId },
    });

    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-[#4f46e5]/30">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <nav className="flex items-center space-x-2 text-[10px] font-semibold text-zinc-500 mb-4 uppercase tracking-widest">
                            <Link href={`/event/${event.id}/live`} className="hover:text-white transition-colors flex items-center gap-1">
                                <ArrowLeft className="w-3 h-3" /> Back
                            </Link>
                            <span className="text-zinc-700">/</span>
                            <span className="text-zinc-300">Leaderboard</span>
                        </nav>
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
                            Rankings
                            <span className="px-2.5 py-1 bg-[#4f46e5]/10 text-[#4f46e5] text-[10px] font-semibold rounded-md uppercase tracking-wider border border-[#4f46e5]/20">
                                Realtime Tracker
                            </span>
                        </h1>
                        <p className="text-zinc-500 text-sm">Public leaderboard displaying dynamic scores driven by team task completions and project submissions for {event.name}.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={`/event/${event.id}/live`}
                            className="bg-[#0a0a0a] border border-[#27272a] hover:border-[#4f46e5]/40 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg"
                        >
                            <Activity className="w-4 h-4 text-[#4f46e5]" />
                            <span className="font-semibold text-xs">Live Status</span>
                        </Link>
                    </div>
                </div>

                <LiveLeaderboard eventId={event.id} />
            </div>
        </div>
    );
}
