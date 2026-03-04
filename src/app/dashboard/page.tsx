"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    Plus,
    Settings,
    Users,
    ChevronRight,
    Rocket,
    Trophy,
    Clock,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    const [teams, setTeams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch("/api/teams");
                if (res.ok) {
                    const data = await res.json();
                    setTeams(data);
                }
            } catch (err) {
                console.error("Failed to fetch teams");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            {/* Sidebar / Nav */}
            <aside className="fixed left-0 top-0 w-64 h-full border-r border-white/5 bg-zinc-950 p-6 hidden md:block">
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">D</div>
                    <span className="font-bold text-xl tracking-tight">DevHack</span>
                </div>

                <nav className="space-y-1">
                    <SidebarLink icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
                    <SidebarLink icon={<Plus className="w-4 h-4" />} label="Join Team" />
                    <SidebarLink icon={<Settings className="w-4 h-4" />} label="Settings" />
                </nav>

                <div className="absolute bottom-10 left-6 right-6 p-4 rounded-2xl bg-indigo-600/10 border border-indigo-600/20">
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2">Upgrade Pro</p>
                    <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">Unlimited teams and priority support.</p>
                    <button className="w-full py-2 bg-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-500 transition-all">Go Pro</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 p-6 md:p-12">
                <div className="max-w-5xl mx-auto space-y-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Your Workspaces</h1>
                            <p className="text-zinc-500 mt-1">Manage your hackathon teams and projects.</p>
                        </div>

                        <Link
                            href="/create-team"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all shadow-xl shadow-white/10"
                        >
                            <Plus className="w-5 h-5" />
                            Create New Team
                        </Link>
                    </div>

                    {/* Teams Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {teams.map((team) => (
                            <Link key={team.id} href={`/workspace/${team.id}`} className="group">
                                <Card className="bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-900/60 hover:border-indigo-500/30 transition-all duration-300 rounded-3xl overflow-hidden backdrop-blur-sm">
                                    <CardHeader className="p-8 pb-0">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2 px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
                                                <Rocket className="w-3 h-3" /> Project
                                            </div>
                                            <div className="text-[10px] text-zinc-600 font-mono uppercase">Active</div>
                                        </div>
                                        <CardTitle className="text-2xl text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{team.projectName}</CardTitle>
                                        <CardDescription className="text-zinc-500 text-sm mt-1">{team.name}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8 py-6 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                                                <Trophy className="w-3.5 h-3.5" /> {team.hackathonName}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                                                <Users className="w-3.5 h-3.5" /> {team._count?.members || 1} Members
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-8 pt-0 border-t border-white/5 mt-4 flex justify-between items-center group-hover:bg-indigo-600/5 transition-colors">
                                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-mono uppercase">
                                            <Clock className="w-3 h-3" /> Updated recently
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                            <ChevronRight className="w-4 h-4 text-white" />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}

                        {/* Empty State / Call to action */}
                        {teams.length === 0 && (
                            <div className="col-span-1 md:col-span-2 py-20 text-center space-y-4 border-2 border-dashed border-zinc-800 rounded-3xl">
                                <p className="text-zinc-500">No teams found.</p>
                                <Link href="/create-team" className="text-indigo-400 hover:underline">Create your first team</Link>
                            </div>
                        )}

                        {teams.length > 0 && teams.length < 3 && (
                            <Link href="/onboarding" className="group">
                                <div className="h-full border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-8 space-y-4 hover:border-zinc-700 hover:bg-zinc-900/20 transition-all min-h-[280px]">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-zinc-400 font-bold">Join Another Team</p>
                                        <p className="text-zinc-600 text-sm">Have an invite code? Click here.</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <a
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                }`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </a>
    )
}
