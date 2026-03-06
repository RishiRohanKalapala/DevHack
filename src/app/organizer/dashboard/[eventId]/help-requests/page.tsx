"use client";

import { useEffect, useState, use } from "react";
import {
    Hand,
    Check,
    Loader2,
    MessageSquare,
    Mail,
    ShieldAlert,
    ExternalLink,
    Timer,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpRequestsPage({ params: paramsPromise }: { params: Promise<{ eventId: string }> }) {
    const params = use(paramsPromise);
    const eventId = params.eventId;

    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isResolving, setIsResolving] = useState<string | null>(null);

    const fetchRequests = async () => {
        try {
            const res = await fetch(`/api/organizer/events/${eventId}/help-requests`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Poll every 8 seconds for a "live" feel
    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 8000);
        return () => clearInterval(interval);
    }, [eventId]);

    const resolveRequest = async (registrationId: string) => {
        setIsResolving(registrationId);
        try {
            const res = await fetch(`/api/organizer/events/${eventId}/help-requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ registrationId })
            });

            if (res.ok) {
                setRequests(prev => prev.filter(r => r.id !== registrationId));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsResolving(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
            </div>
        );
    }

    return (
        <div className="space-y-10 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="space-y-1 pb-8 border-b border-white/5">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4 uppercase font-black">
                    Help Desk
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-bold rounded-full border border-amber-500/20 shadow-lg shadow-amber-500/5 animate-pulse">
                        LIVE MONITOR
                    </span>
                </h1>
                <p className="text-zinc-500 text-sm font-medium px-1">Active distress signals from team leads. Respond to these requests immediately.</p>
            </div>

            {/* Grid of Distress Signals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500"
                    >
                        {/* Status Aura */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[40px] rounded-full pointer-events-none" />

                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">Distress Signal</span>
                                <h3 className="text-xl font-bold text-white tracking-tight pt-2">{request.teamName}</h3>
                                <p className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
                                    <Mail className="w-3.5 h-3.5" /> {request.leadEmail}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 animate-[pulse_2s_infinite]">
                                <Hand className="w-6 h-6 text-amber-500 fill-amber-500" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="space-y-0.5">
                                <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Signal Active Since</p>
                                <p className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                                    <Timer className="w-3.5 h-3.5 text-zinc-500" />
                                    {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={`/workspace/${request.id}`}
                                    target="_blank"
                                    className="p-2.5 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 transition-all group/link"
                                >
                                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover/link:text-white" />
                                </a>
                            </div>
                        </div>

                        <Button
                            onClick={() => resolveRequest(request.id)}
                            disabled={isResolving === request.id}
                            className="w-full h-12 bg-amber-600 hover:bg-emerald-600 text-white font-black rounded-xl transition-all shadow-xl shadow-amber-600/10 flex items-center justify-center gap-2 group/btn"
                        >
                            {isResolving === request.id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Check className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                    MARK AS RESOLVED
                                </>
                            )}
                        </Button>
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="lg:col-span-3 py-24 text-center space-y-6 bg-zinc-950/40 border-2 border-dashed border-white/5 rounded-[3rem]">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-white font-bold text-xl uppercase font-black">All Clear</h3>
                            <p className="text-zinc-500 text-sm font-medium">No active help requests from team leads.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Protocol Notice */}
            <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] flex items-start gap-6 relative overflow-hidden">
                <ShieldAlert className="w-8 h-8 text-indigo-500 shrink-0" />
                <div className="space-y-2 relative z-10">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest">Organizer Support Protocol</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium max-w-3xl">
                        When a team lead raises their hand, it will appear here immediately. Once you address their issue, click "Mark as Resolved" to lower the hand icon on the public leaderboard. This page polls for new signals every 8 seconds.
                    </p>
                </div>
            </div>
        </div>
    );
}
