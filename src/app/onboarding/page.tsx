"use client";

import Link from "next/link";
import { PlusCircle, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 selection:bg-indigo-500/30 relative overflow-hidden">
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

            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

            <div className="w-full max-w-[800px] space-y-12 relative z-10">
                {/* Branding / Header */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="inline-flex py-1 px-3 rounded-full bg-[#121214] border border-white/5 text-zinc-400 text-xs font-medium tracking-wide">
                        Welcome to DevHack
                    </div>
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-outfit">Step into your workspace</h1>
                        <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto font-medium">
                            Choose how you'd like to start your journey. Create a team from scratch or join an existing one.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Create Team Card */}
                    <button
                        onClick={() => router.push("/create-team")}
                        className="group relative flex flex-col p-8 rounded-[2rem] bg-[#121214] border border-white/5 hover:border-indigo-500/30 transition-all text-left overflow-hidden shadow-2xl shadow-black/50"
                    >
                        {/* Subtle background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="w-12 h-12 rounded-xl bg-[#18181b] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300">
                            <PlusCircle className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors duration-300" />
                        </div>

                        <div className="space-y-3 relative z-10 flex-grow">
                            <h2 className="text-xl font-bold text-white tracking-tight">Create a Team</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                Starting a new project? Create a workspace for your team and invite members.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-indigo-400 text-sm font-bold group-hover:gap-3 transition-all pt-5 border-t border-white/5 w-full">
                            Start creation{" "}
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                    </button>

                    {/* Join Team Card */}
                    <button
                        onClick={() => router.push("/join-team-preview")}
                        className="group relative flex flex-col p-8 rounded-[2rem] bg-[#121214] border border-white/5 hover:border-emerald-500/30 transition-all text-left overflow-hidden shadow-2xl shadow-black/50"
                    >
                        {/* Subtle background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="w-12 h-12 rounded-xl bg-[#18181b] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
                            <Users className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300" />
                        </div>

                        <div className="space-y-3 relative z-10 flex-grow">
                            <h2 className="text-xl font-bold text-white tracking-tight">Join a Team</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                Already have an invite? Enter your code to jump into an existing project workspace.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-emerald-400 text-sm font-bold group-hover:gap-3 transition-all pt-5 border-t border-white/5 w-full">
                            Enter invite code{" "}
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                    </button>
                </div>

                {/* Footer Subtle Text */}
                <p className="text-center text-[10px] text-zinc-700 font-medium pt-8">
                    Secure Cloud Infrastructure by DevHack
                </p>
            </div>
        </div>
    );
}
