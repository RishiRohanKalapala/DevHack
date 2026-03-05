"use client";

import { useState } from "react";
import { Loader2, Mail, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegistrationForm({ eventId }: { eventId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            const teamName = formData.get("teamName");
            const leadEmail = formData.get("leadEmail");

            const res = await fetch(`/api/event/${eventId}/register`, {
                method: "POST",
                body: JSON.stringify({ teamName, leadEmail }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                // Navigate to onboarding directly as per updated flow
                setTimeout(() => {
                    window.location.href = data.redirectTo || "/onboarding";
                }, 2000);
            } else {
                setStatus("error");
                setMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "success") {
        return (
            <div className="bg-[#0a0a0a] border border-[#4f46e5]/30 rounded-2xl p-10 text-center space-y-6 shadow-lg shadow-[#4f46e5]/5">
                <div className="w-16 h-16 bg-[#4f46e5]/10 rounded-full mx-auto flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#4f46e5] animate-spin" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white tracking-tight">Mission Initialized!</h2>
                    <p className="text-zinc-500 mt-2 text-sm font-medium">Redirecting to your mission control workspace...</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-[#27272a] rounded-2xl p-8 shadow-xl shadow-black/50 overflow-hidden relative">
            <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Team Name</label>
                    <div className="relative group">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#4f46e5] transition-colors" />
                        <input
                            name="teamName"
                            placeholder="Quantum Hackers"
                            required
                            className="w-full h-11 bg-black border border-[#27272a] focus:border-[#4f46e5]/50 text-white rounded-xl pl-11 outline-none transition-all placeholder:text-zinc-700 text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Team Lead Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#4f46e5] transition-colors" />
                        <input
                            name="leadEmail"
                            type="email"
                            placeholder="lead@example.com"
                            required
                            className="w-full h-11 bg-black border border-[#27272a] focus:border-[#4f46e5]/50 text-white rounded-xl pl-11 outline-none transition-all placeholder:text-zinc-700 text-sm font-medium"
                        />
                    </div>
                </div>

                {status === "error" && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium text-center">
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-white text-black hover:bg-zinc-200 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group shadow-lg shadow-white/5 disabled:opacity-50 mt-4"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Registration Request"}
                </button>
            </div>
        </form>
    );
}
