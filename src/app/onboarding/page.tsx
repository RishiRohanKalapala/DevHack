"use client";

import Link from "next/link";
import { PlusCircle, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnboardingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-[#4f46e5]/30 relative overflow-hidden font-sans">
            {/* Logo at top left */}
            <div className="absolute top-10 left-10 z-50">
                <Link href="/" className="flex items-center group">
                    <Image
                        src="https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-04_at_20.33.46-removebg-preview.png"
                        alt="DevHack Logo"
                        width={160}
                        height={40}
                        priority
                        className="h-8 md:h-10 w-auto object-contain brightness-125 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                </Link>
            </div>

            {/* Simpler Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4f46e5]/5 blur-[120px] rounded-full -z-10" />

            <div className="w-full max-w-[800px] space-y-12 relative z-10 mt-10">
                <div className="flex flex-col items-center space-y-4">
                    <div className="inline-flex py-1.5 px-4 rounded-full bg-[#4f46e5]/10 border border-[#4f46e5]/20 text-[#4f46e5] text-xs font-semibold uppercase tracking-widest">
                        Registration Success
                    </div>
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">Step into your workspace.</h1>
                        <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                            Finalize your landing by setting up your project workspace or joining an existing squad.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {/* Create Team Card */}
                    <button
                        onClick={() => router.push("/create-team")}
                        className="group relative flex flex-col p-10 rounded-3xl bg-zinc-900/40 border border-[#27272a] hover:border-[#4f46e5]/50 transition-all text-left overflow-hidden shadow-2xl shadow-black/50"
                    >
                        <div className="w-12 h-12 rounded-xl bg-black border border-[#27272a] flex items-center justify-center mb-6 group-hover:bg-[#4f46e5] group-hover:border-[#4f46e5] transition-all duration-300 shadow-lg">
                            <PlusCircle className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                        </div>

                        <div className="space-y-3 relative z-10 flex-grow">
                            <h2 className="text-xl font-semibold text-white tracking-tight">Initiate Mission</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                Create a blank canvas for your innovation. Setup your team goals and invite collaborators.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-[#4f46e5] text-xs font-semibold transition-all pt-6 border-t border-[#27272a] w-full uppercase tracking-wider">
                            Continue creation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </div>
                    </button>

                    {/* Join Team Card */}
                    <button
                        onClick={() => router.push("/join-team-preview")}
                        className="group relative flex flex-col p-10 rounded-3xl bg-zinc-900/40 border border-[#27272a] hover:border-zinc-500 transition-all text-left overflow-hidden shadow-2xl shadow-black/50"
                    >
                        <div className="w-12 h-12 rounded-xl bg-black border border-[#27272a] flex items-center justify-center mb-6 group-hover:bg-zinc-200 transition-all duration-300 shadow-lg">
                            <Users className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors duration-300" />
                        </div>

                        <div className="space-y-3 relative z-10 flex-grow">
                            <h2 className="text-xl font-semibold text-white tracking-tight">Sync Existing</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                Received a join code? Enter the relay portal to access your existing project dashboard.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-zinc-400 group-hover:text-white text-xs font-semibold transition-all pt-6 border-t border-[#27272a] w-full uppercase tracking-wider">
                            Enter code
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </div>
                    </button>
                </div>

                <p className="text-center text-xs text-zinc-600 font-semibold uppercase tracking-[0.2em] pt-12">
                    Operation Engine v2.0
                </p>
            </div>
        </div>
    );
}
