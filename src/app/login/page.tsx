"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                const data = await res.json();
                setError(data.message || "Invalid credentials");
            }
        } catch (err: any) {
            setError("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-indigo-500/30">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -z-10" />

            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2 group mb-4">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">D</div>
                        <span className="font-bold text-xl tracking-tight text-white">DevHack</span>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                    <p className="text-zinc-500">Sign in to access your workspace.</p>
                </div>

                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl">
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-xl text-white">Login</CardTitle>
                            <CardDescription className="text-zinc-500">
                                Enter your credentials to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-zinc-500" /> Password
                                    </label>
                                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                                </div>
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
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                            </Button>
                            <div className="text-center text-sm text-zinc-500">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Register</Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
