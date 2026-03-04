"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (!token) {
            setError("Invalid or missing reset token");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.message || "Failed to reset password");
            }
        } catch (err: any) {
            setError("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token && !success && !error) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                <h3 className="text-xl font-bold text-rose-400">Invalid Link</h3>
                <p className="text-sm text-zinc-400">
                    The password reset link is invalid or missing the reset token.
                </p>
                <Link href="/forgot-password" className="mt-4 text-indigo-400 hover:text-white transition-colors text-sm font-medium">
                    Request a new link
                </Link>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Password Reset Successful</h3>
                <p className="text-sm text-zinc-400">
                    Your password has been successfully updated. You can now sign in with your new password.
                </p>
                <Link href="/login" className="mt-4 w-full h-12 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-sm transition-all shadow-lg shadow-white/5 flex items-center justify-center">
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">New Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                        <Input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            minLength={6}
                            className="h-12 bg-black border-white/5 focus:border-indigo-500/50 text-white rounded-xl pl-11 transition-all placeholder:text-zinc-700 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Confirm New Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            required
                            minLength={6}
                            className="h-12 bg-black border-white/5 focus:border-indigo-500/50 text-white rounded-xl pl-11 transition-all placeholder:text-zinc-700 text-sm"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-400 text-sm font-medium text-center">
                    {error}
                </div>
            )}

            <div className="space-y-4 pt-2">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-sm transition-all shadow-lg shadow-white/5 disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                </Button>

                <div className="text-center">
                    <Link href="/login" className="text-sm text-zinc-500 hover:text-white font-medium transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default function ResetPasswordPage() {
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

            <div className="w-full max-w-[400px] space-y-10 relative">
                {/* Branding */}
                <div className="flex flex-col items-center space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Choose New Password</h1>
                        <p className="text-zinc-500 text-sm">Secure your account with a strong password</p>
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-[2rem] p-8 shadow-2xl shadow-black/50">
                    <Suspense fallback={
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
                        </div>
                    }>
                        <ResetPasswordForm />
                    </Suspense>
                </div>

                {/* Footer Subtle Text */}
                <p className="text-center text-[10px] text-zinc-700 font-medium">
                    Secure Cloud Infrastructure by DevHack
                </p>
            </div>
        </div>
    );
}
