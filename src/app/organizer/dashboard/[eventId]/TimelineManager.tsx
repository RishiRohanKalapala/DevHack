"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Clock } from "lucide-react";

export default function TimelineManager({ eventId, existingTimelines }: { eventId: string, existingTimelines: any[] }) {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !time) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/organizer/events/${eventId}/timeline`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, time }),
            });

            if (res.ok) {
                setTitle("");
                setTime("");
                router.refresh();
            } else {
                alert("Failed to add timeline event");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Clock className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Event Timeline Manager</h2>
            </div>

            <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="E.g., Opening Ceremony"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="flex-1 bg-black border border-white/5 focus:border-indigo-500/50 text-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-zinc-600 font-medium"
                />
                <input
                    type="datetime-local"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="flex-1 bg-black border border-white/5 focus:border-indigo-500/50 text-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-zinc-600 font-medium md:max-w-xs"
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-50 whitespace-nowrap"
                >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> Add Point</>}
                </button>
            </form>

            <div className="space-y-4 pt-4">
                {existingTimelines.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 font-medium bg-black/50 rounded-2xl border border-white/5">
                        No timeline events added yet.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {existingTimelines.map((timeline) => (
                            <div key={timeline.id} className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
                                <div className="font-medium text-white">{timeline.title}</div>
                                <div className="text-sm font-bold text-indigo-400 tracking-wider">
                                    {new Date(timeline.time).toLocaleString(undefined, {
                                        month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
