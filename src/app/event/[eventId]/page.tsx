import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RegistrationForm from "./RegistrationForm";
import Link from "next/link";
import { Calendar, Globe, Users, Trophy } from "lucide-react";

export default async function PublicEventPage({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;

    const event = await prisma.hackathonEvent.findUnique({
        where: { id: eventId },
        include: { organizer: true },
    });

    if (!event) {
        notFound();
    }

    const startDateStr = event.startDate ? new Date(event.startDate).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric"
    }) : "TBA";

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#4f46e5]/30 font-sans">
            <div className="absolute top-0 inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.08),transparent_70%)]" />

            <header className="fixed top-0 w-full border-b border-[#27272a] bg-[#050505]/80 backdrop-blur-xl z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="font-semibold text-xl tracking-tight">
                        DevHack
                    </Link>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#4f46e5] px-3 py-1.5 bg-[#4f46e5]/10 border border-[#4f46e5]/20 rounded-md">
                        Official Partner Event
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Event Info Left Column */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                                {event.name}
                            </h1>
                            <p className="text-lg text-[#4f46e5] font-medium tracking-tight">
                                Hosted by {event.organizer.name}
                            </p>
                        </div>

                        <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 font-medium leading-relaxed text-sm">
                            <p>{event.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-[#27272a]">
                            <div className="bg-[#0a0a0a] border border-[#27272a] p-5 rounded-2xl flex flex-col gap-2 shadow-sm">
                                <Calendar className="w-4 h-4 text-emerald-400" />
                                <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-widest">Start Date</span>
                                <span className="text-white text-sm font-medium">{startDateStr}</span>
                            </div>
                            <div className="bg-[#0a0a0a] border border-[#27272a] p-5 rounded-2xl flex flex-col gap-2 shadow-sm">
                                <Globe className="w-4 h-4 text-sky-400" />
                                <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-widest">Format</span>
                                <span className="text-white text-sm font-medium">Virtual Network</span>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form Right Column */}
                    <div className="lg:pl-8">
                        <div className="sticky top-32">
                            <RegistrationForm eventId={event.id} />

                            <div className="mt-8 flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                <Trophy className="w-6 h-6 text-amber-500" />
                                <Users className="w-6 h-6 text-zinc-400" />
                                <Calendar className="w-6 h-6 text-zinc-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
