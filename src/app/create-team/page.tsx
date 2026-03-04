"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Rocket, Users, Trophy, ClipboardList, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTeamPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            teamName: formData.get("teamName"),
            projectName: formData.get("projectName"),
            hackathonName: formData.get("hackathonName"),
            teamSize: formData.get("teamSize"),
            description: formData.get("description"),
        };

        try {
            const res = await fetch("/api/create-team", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                const result = await res.json();
                router.push(`/workspace/${result.teamId}`);
            } else {
                console.error("Failed to create team");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 selection:bg-indigo-500/30 relative overflow-hidden">
            {/* Logo at top left */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="transition-transform hover:scale-105 duration-300">
                    <img
                        src="https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-04_at_20.33.46-removebg-preview.png"
                        alt="DevHack Logo"
                        className="h-16 w-auto object-contain"
                    />
                </Link>
            </div>
            <div className="max-w-4xl mx-auto space-y-8 relative">
                <nav className="flex items-center space-x-2 text-sm font-medium text-zinc-500 mb-8">
                    <Link href="/dashboard" className="hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <span className="text-zinc-700">/</span>
                    <Link href="/onboarding" className="hover:text-white transition-colors">
                        Onboarding
                    </Link>
                    <span className="text-zinc-700">/</span>
                    <span className="text-indigo-400">Create Team</span>
                </nav>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-outfit">Set up your workspace.</h1>
                    <p className="text-zinc-500 text-lg font-medium">Define the mission and rally your team members.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 relative z-10">
                    <div className="lg:col-span-2">
                        <div className="bg-[#121214] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                                    <h2 className="text-xl text-white font-bold tracking-tight">Project details</h2>
                                    <p className="text-zinc-500 text-sm font-medium mt-1">Provide the foundational information for your team.</p>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-zinc-400 ml-1 flex items-center gap-2">
                                                <Users className="w-4 h-4 text-indigo-400" /> Team name
                                            </label>
                                            <Input
                                                name="teamName"
                                                placeholder="Team Alpha"
                                                required
                                                className="bg-black border-white/5 h-12 focus:border-indigo-500/50 text-white rounded-xl placeholder:text-zinc-800 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-zinc-400 ml-1 flex items-center gap-2">
                                                <Rocket className="w-4 h-4 text-emerald-400" /> Project name
                                            </label>
                                            <Input
                                                name="projectName"
                                                placeholder="Smart Waste Guard"
                                                required
                                                className="bg-black border-white/5 h-12 focus:border-indigo-500/50 text-white rounded-xl placeholder:text-zinc-800 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-zinc-400 ml-1 flex items-center gap-2">
                                                <Trophy className="w-4 h-4 text-amber-400" /> Hackathon name
                                            </label>
                                            <Input
                                                name="hackathonName"
                                                placeholder="Global AI Summit 2026"
                                                required
                                                className="bg-black border-white/5 h-12 focus:border-indigo-500/50 text-white rounded-xl placeholder:text-zinc-800 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-zinc-400 ml-1 flex items-center gap-2">
                                                <Users className="w-4 h-4 text-rose-400" /> Team size
                                            </label>
                                            <Input
                                                name="teamSize"
                                                type="number"
                                                max={10}
                                                defaultValue={4}
                                                className="bg-black border-white/5 h-12 focus:border-indigo-500/50 text-white rounded-xl transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-zinc-400 ml-1 flex items-center gap-2">
                                            <ClipboardList className="w-4 h-4 text-sky-400" /> Project description
                                        </label>
                                        <Textarea
                                            name="description"
                                            placeholder="Briefly describe what you are building during the hackathon..."
                                            className="bg-black border-white/5 min-h-[140px] focus:border-indigo-500/50 text-white rounded-2xl p-4 placeholder:text-zinc-800 transition-all font-medium resize-y"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 bg-black/20 border-t border-white/5 flex justify-end gap-4 mt-auto">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-white text-black hover:bg-zinc-200 px-8 h-12 rounded-xl font-bold shadow-lg shadow-white/5 transition-all flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Finalize & Create</>}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 rounded-[2rem] bg-[#121214] border border-white/5 space-y-5 shadow-xl shadow-black/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-lg font-bold text-white tracking-tight relative z-10 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-indigo-400" />
                                </div>
                                Team leader kit
                            </h3>
                            <ul className="space-y-4 text-zinc-500 text-sm font-medium relative z-10">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-md bg-[#18181b] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-zinc-400">1</div>
                                    <span>Invite link will be generated instantly for copying.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-md bg-[#18181b] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-zinc-400">2</div>
                                    <span>You will be assigned as the primary Team Lead.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-md bg-[#18181b] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-zinc-400">3</div>
                                    <span>All workspace productivity modules will initialize.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 rounded-[2rem] border border-white/5 space-y-4 bg-transparent group hover:bg-[#121214] transition-colors duration-300">
                            <h3 className="text-lg font-bold text-white tracking-tight">Need help?</h3>
                            <p className="text-zinc-500 text-sm font-medium leading-relaxed">Check our official strategy guide for timeline planning tips and architectural advice.</p>
                            <a href="#" className="flex items-center gap-1 text-indigo-400 text-sm font-bold hover:gap-2 transition-all mt-4 w-max">
                                View strategy guide <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
