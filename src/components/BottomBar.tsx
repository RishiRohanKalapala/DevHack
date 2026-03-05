"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function BottomBar() {
    return (
        <footer className="relative flex-none w-full px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/[0.05] z-50 bg-black">
            <div className="flex flex-col items-center md:items-start select-none">
                <div className="flex items-center gap-5 text-[8px] font-bold text-zinc-700 uppercase tracking-[0.3em]">
                    <span>© 2026 DevHack</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span>Secure Tunnel</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span>99.9% Uptime</span>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <Link href="https://github.com/RishiRohanKalapala/DevHack" target="_blank" className="flex items-center gap-2 group text-zinc-700 hover:text-white transition-colors duration-300">
                    <Github className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Repository</span>
                </Link>
                <div className="flex items-center gap-3 text-zinc-800 font-mono text-[8px] uppercase tracking-widest font-black">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                    Kernel Stable
                </div>
            </div>
        </footer>
    );
}
