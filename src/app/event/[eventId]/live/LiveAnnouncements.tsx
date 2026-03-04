"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function LiveAnnouncements({ eventId }: { eventId: string }) {
    const [latestAnnouncement, setLatestAnnouncement] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [knownCount, setKnownCount] = useState(0);

    useEffect(() => {
        let isFirstFetch = true;

        const fetchAnnouncements = async () => {
            try {
                const res = await fetch(`/api/event/${eventId}/timeline`);
                if (!res.ok) return;

                const data = await res.json();
                const timelines = data.timelines || [];

                // If there are new announcements compared to what we know
                if (!isFirstFetch && timelines.length > knownCount) {
                    const latest = timelines[0]; // because it's ordered by createdAt desc
                    setLatestAnnouncement(`[${new Date(latest.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] ${latest.title}`);
                    setIsVisible(true);

                    // Auto hide notification
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 8000);
                }

                setKnownCount(timelines.length);
                isFirstFetch = false;
            } catch (error) {
                console.error("Failed fetching timeline", error);
            }
        };

        fetchAnnouncements();
        // Poll every 10 seconds
        const interval = setInterval(fetchAnnouncements, 10000);
        return () => clearInterval(interval);
    }, [eventId, knownCount]);

    if (!isVisible || !latestAnnouncement) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="bg-indigo-600 border border-indigo-400/50 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                    <Bell className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                    <h4 className="font-bold text-sm tracking-wide uppercase opacity-80">Organizer Update</h4>
                    <p className="font-medium text-lg">{latestAnnouncement}</p>
                </div>
            </div>
        </div>
    );
}
