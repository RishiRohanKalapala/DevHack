"use client";

import Link from "next/link";
import { ArrowRight, Zap, Globe, Shield, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-rose-500/30 font-sans tracking-tight">
      {/* Minimal Header */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? "py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5" : "py-10 bg-transparent"}`}>
        <div className="max-w-5xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-04_at_20.33.46-removebg-preview.png"
              alt="DevHack Logo"
              className="h-10 w-auto object-contain brightness-125 hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex items-center gap-8">
            <Link href="/login" className="text-[11px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-xl"
            >
              Open Access
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-20">
        {/* Hero / Vision Body */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
          {/* Atmospheric Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 blur-[140px] rounded-full -z-10 animate-pulse-slow" />

          <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <div className="inline-flex py-1.5 px-4 rounded-full bg-white/[0.03] border border-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md">
              Operational Status: Active
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.9] text-white">
                Build the<br />
                <span className="text-zinc-800">unbuildable.</span>
              </h1>
              <p className="max-w-xl mx-auto text-lg md:text-xl text-zinc-500 font-medium leading-relaxed italic opacity-70">
                The high-performance workspace for elite hackathon teams. Precision engineered for speed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link
                href="/register"
                className="w-full sm:w-auto px-12 py-6 bg-rose-500 text-white font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] hover:bg-white hover:text-black transition-all shadow-2xl shadow-rose-500/20 flex items-center justify-center gap-3 group"
              >
                Start Mission
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/organizer/login"
                className="w-full sm:w-auto px-12 py-6 bg-zinc-950/40 border border-white/5 text-zinc-500 font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] hover:bg-white/5 transition-all flex items-center justify-center gap-3"
              >
                <Zap className="w-4 h-4 text-rose-500" />
                Organizer Hub
              </Link>
            </div>
          </div>

          {/* Simple Feature Row (Single Page Look) */}
          <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto w-full px-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-px h-8 bg-rose-500 group-hover:h-12 transition-all duration-500" />
              <div className="text-left">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Live Sync</h3>
                <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-wider">0ms Latency Relay</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-px h-8 bg-zinc-800 group-hover:bg-rose-500 group-hover:h-12 transition-all duration-500" />
              <div className="text-left">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Vaulted Docs</h3>
                <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-wider">Encrypted Workspace</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-px h-8 bg-zinc-800 group-hover:bg-rose-500 group-hover:h-12 transition-all duration-500" />
              <div className="text-left">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Telemetry</h3>
                <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-wider">Live Rank Sync</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call */}
        <section className="py-40 px-6 border-t border-white/5 text-center">
          <img
            src="https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-04_at_20.33.46-removebg-preview.png"
            alt="DevHack Logo"
            className="h-16 mx-auto mb-10 opacity-20 hover:opacity-100 transition-opacity duration-1000 grayscale"
          />
          <Link href="/register" className="text-[11px] font-black text-rose-500 uppercase tracking-[0.5em] hover:tracking-[0.8em] transition-all">
            Execute Genesis Protocol
          </Link>
        </section>
      </main>

      {/* Simple Minimal Footer */}
      <footer className="py-12 border-t border-white/5 px-8 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">
          © 2026 DevHack Platform. All systems operational.
        </p>
        <div className="flex items-center gap-10 text-[10px] font-black text-zinc-800 uppercase tracking-widest">
          <a href="#" className="hover:text-rose-500 transition-colors">Twitter</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Docs</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
