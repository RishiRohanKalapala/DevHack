"use client";

import { useEffect, useState } from "react";
import { Trophy, Medal, CheckCircle2, CircleDashed, Loader2 } from "lucide-react";

export default function LiveLeaderboard({ eventId }: { eventId: string }) {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch(`/api/event/${eventId}/leaderboard`);
                if (res.ok) {
                    const data = await res.json();
                    setLeaderboard(data.leaderboard);
                }
            } catch (error) {
                console.error("Leaderboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
        // Live poll every 5 seconds for real-time leaderboards changes
        const interval = setInterval(fetchLeaderboard, 5000);
        return () => clearInterval(interval);
    }, [eventId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (leaderboard.length === 0) {
        return (
            <div className="bg-[#121214] border border-white/5 rounded-3xl p-12 text-center text-zinc-500 font-medium shadow-2xl">
                No active teams on the leaderboard yet. Teams must be invited by the organizer.
            </div>
        );
    }

    return (
        <div className="bg-[#121214] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5 bg-black/40">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                    <Trophy className="w-6 h-6 text-amber-500" /> Event Leaderboard
                </h3>
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 absolute"></span>
                    <span className="ml-2 pl-2 border-l border-indigo-500/30">Live Syncing</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/20 text-xs uppercase tracking-widest text-zinc-500">
                            <th className="px-6 py-5 font-bold">Rank</th>
                            <th className="px-6 py-5 font-bold">Team Name</th>
                            <th className="px-6 py-5 font-bold">Score</th>
                            <th className="px-6 py-5 font-bold">Completed Tasks</th>
                            <th className="px-6 py-5 font-bold">Submission Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm font-medium">
                        {leaderboard.map((team, idx) => (
                            <tr key={team.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-3">
                                        {team.rank === 1 && <Medal className="w-6 h-6 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />}
                                        {team.rank === 2 && <Medal className="w-6 h-6 text-zinc-300 drop-shadow-[0_0_8px_rgba(212,212,216,0.3)]" />}
                                        {team.rank === 3 && <Medal className="w-6 h-6 text-amber-700" />}
                                        <span className={`font-black text-xl ${team.rank <= 3 ? 'text-white' : 'text-zinc-600'}`}>
                                            #{team.rank}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-white font-bold text-lg">{team.teamName}</td>
                                <td className="px-6 py-6">
                                    <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-xl font-mono font-bold whitespace-nowrap">
                                        {team.score} PTS
                                    </span>
                                </td>
                                <td className="px-6 py-6 text-zinc-400 font-bold">
                                    {team.tasksCompleted} Tasks
                                </td>
                                <td className="px-6 py-6">
                                    {team.hasSubmission ? (
                                        <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl w-fit border border-emerald-500/20">
                                            <CheckCircle2 className="w-4 h-4" /> Submitted
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-zinc-500 font-bold px-3 py-1.5 rounded-xl w-fit">
                                            <CircleDashed className="w-4 h-4" /> Working
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
