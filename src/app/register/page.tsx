"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                router.push("/onboarding");
            } else {
                const data = await res.json();
                setError(data.message || "Something went wrong");
            }
        } catch (err: any) {
            setError("Failed to connected to server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-indigo-500/30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -z-10" />

            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2 group mb-4">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">D</div>
                        <span className="font-bold text-xl tracking-tight text-white">DevHack</span>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
                    <p className="text-zinc-500">Join thousands of hackers building the future.</p>
                </div>

                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl">
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-xl text-white">Register</CardTitle>
                            <CardDescription className="text-zinc-500">
                                Enter your details to create your workspace account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <User className="w-4 h-4 text-zinc-500" /> Full Name
                                </label>
                                <Input
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    className="bg-black/50 border-zinc-800 focus:border-indigo-500 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-zinc-500" /> Email
                                </label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="bg-black/50 border-zinc-800 focus:border-indigo-500 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-zinc-500" /> Password
                                </label>
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    className="bg-black/50 border-zinc-800 focus:border-indigo-500 text-white"
                                />
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                                    {error}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-12 font-bold transition-all"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                            </Button>
                            <div className="text-center text-sm text-zinc-500">
                                Already have an account?{" "}
                                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Log in</Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <div className="flex items-center justify-center gap-6 text-zinc-600 grayscale brightness-150">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                        <ShieldCheck className="w-4 h-4" /> Secure Auth
                    </div>
                </div>
            </div>
        </div>
    );
}
