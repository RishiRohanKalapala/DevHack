"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, ArrowRight, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JoinTeamPreviewPage() {
    const [inviteCode, setInviteCode] = useState("");
    const router = useRouter();

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (inviteCode.trim()) {
            router.push(`/join/${inviteCode.trim()}`);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-indigo-500/30">
            {/* Background Glow */}
            <div className="absolute top-0 inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />

            <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/10 transition-transform hover:scale-110">
                        <Users className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Join a Team</h1>
                    <p className="text-zinc-500">
                        Enter the unique invite code shared by your project lead to access the workspace.
                    </p>
                </div>

                <div className="bg-zinc-950/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Search className="w-24 h-24" />
                    </div>

                    <form onSubmit={handleJoin} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-600 ml-1">
                                Invite Code
                            </label>
                            <Input
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                placeholder="e.g. ABCD123"
                                className="h-14 bg-zinc-900/50 border-zinc-800 focus:border-emerald-500 rounded-2xl px-6 text-lg font-mono tracking-widest uppercase transition-all placeholder:text-zinc-700"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/20 text-lg flex items-center justify-center gap-2 group transition-all"
                        >
                            Enter Workspace
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => router.push("/onboarding")}
                        className="text-zinc-500 hover:text-white text-sm transition-colors"
                    >
                        Wait, take me back to onboarding
                    </button>
                    <p className="text-zinc-600 text-[10px] flex items-center gap-2 uppercase tracking-tighter">
                        <ShieldCheck className="w-3 h-3" /> Encrypted Access Management
                    </p>
                </div>
            </div>
        </div>
    );
}
