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
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 font-sans selection:bg-rose-500/30">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <nav className="flex items-center space-x-2 text-sm font-bold text-zinc-500 mb-6">
                            <Link href={`/event/${event.id}/live`} className="hover:text-white transition-colors flex items-center gap-1">
                                <ArrowLeft className="w-4 h-4" /> Back to Live Status
                            </Link>
                            <span className="text-zinc-700">/</span>
                            <span className="text-amber-500">Leaderboard</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
                            Rankings
                            <span className="px-4 py-2 bg-rose-500/10 text-rose-500 text-sm font-bold rounded-full uppercase tracking-widest border border-rose-500/20">
                                Realtime Tracker
                            </span>
                        </h1>
                        <p className="text-zinc-500 text-lg font-medium">Public leaderboard displaying dynamic scores driven by team task completions and project submissions for {event.name}.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={`/event/${event.id}/live`}
                            className="bg-[#121214] border border-white/5 hover:bg-white/[0.02] px-6 py-4 rounded-2xl flex items-center gap-3 transition-colors shadow-2xl"
                        >
                            <Activity className="w-5 h-5 text-rose-500" />
                            <span className="font-bold">Live Status</span>
                        </Link>
                    </div>
                </div>

                <LiveLeaderboard eventId={event.id} />
            </div>
        </div>
    );
}
