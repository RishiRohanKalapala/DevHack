"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Rocket, Users, Trophy, ClipboardList, Send } from "lucide-react";
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
        <div className="min-h-screen bg-black text-white p-6 md:p-12 selection:bg-indigo-500/30">
            <div className="max-w-4xl mx-auto space-y-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group mb-8">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Onboarding
                </button>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Set up your workspace.</h1>
                    <p className="text-zinc-500 text-lg">Define the mission and rally your team members.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                    <div className="lg:col-span-2">
                        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl rounded-3xl overflow-hidden">
                            <form onSubmit={handleSubmit}>
                                <CardHeader className="p-8 border-b border-zinc-800 bg-zinc-900/20">
                                    <CardTitle className="text-2xl text-white">Project Details</CardTitle>
                                    <CardDescription className="text-zinc-500">Provide the foundational information for your team.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <Users className="w-4 h-4" /> Team Name
                                            </label>
                                            <Input
                                                name="teamName"
                                                placeholder="Team Alpha"
                                                required
                                                className="bg-black/50 border-zinc-800 h-12 focus:border-indigo-500 text-white rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <Rocket className="w-4 h-4" /> Project Name
                                            </label>
                                            <Input
                                                name="projectName"
                                                placeholder="Smart Waste Guard"
                                                required
                                                className="bg-black/50 border-zinc-800 h-12 focus:border-indigo-500 text-white rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <Trophy className="w-4 h-4" /> Hackathon Name
                                            </label>
                                            <Input
                                                name="hackathonName"
                                                placeholder="Global AI Summit 2026"
                                                required
                                                className="bg-black/50 border-zinc-800 h-12 focus:border-indigo-500 text-white rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <Users className="w-4 h-4" /> Team Size
                                            </label>
                                            <Input
                                                name="teamSize"
                                                type="number"
                                                max={10}
                                                defaultValue={4}
                                                className="bg-black/50 border-zinc-800 h-12 focus:border-indigo-500 text-white rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            <ClipboardList className="w-4 h-4" /> Project Description
                                        </label>
                                        <Textarea
                                            name="description"
                                            placeholder="Briefly describe what you are building during the hackathon..."
                                            className="bg-black/50 border-zinc-800 min-h-[120px] focus:border-indigo-500 text-white rounded-2xl p-4"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="p-8 bg-zinc-900/30 border-t border-zinc-800 flex justify-end gap-4">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 h-12 rounded-xl font-bold shadow-2xl shadow-indigo-600/20 transition-all flex items-center gap-2"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Finalize & Create</>}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <div className="p-8 rounded-3xl bg-indigo-600/10 border border-indigo-600/20 space-y-4">
                            <h3 className="text-xl font-bold text-indigo-400">Team Lead Kit</h3>
                            <ul className="space-y-3 text-zinc-400 text-sm">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">1</div>
                                    <span>Invite link will be generated instantly.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">2</div>
                                    <span>You'll be assigned as the Team Lead.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">3</div>
                                    <span>Workspace modules will be initialized.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 rounded-3xl border border-zinc-800 space-y-4">
                            <h3 className="text-xl font-bold text-zinc-300">Need Help?</h3>
                            <p className="text-zinc-500 text-sm">Check our hackathon strategy guide for tips on setting up your project roadmap.</p>
                            <a href="#" className="text-indigo-400 text-sm font-medium hover:underline inline-block mt-2">View Strategy Guide →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
