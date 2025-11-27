'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { Button } from '@/app-components/ui/button';
import { Input } from '@/app-components/ui/input';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [errorMessage, dispatch, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Logo/Brand */}
            <div className="flex flex-col items-center justify-center bg-primary/5 p-10">
                <div className="relative mb-8 h-32 w-48">
                    <Image
                        src="/Images/Logo/1.png"
                        alt="ICCD Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">
                        Sign in to manage programs, testimonials, and view incoming requests.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-sm space-y-6">
                    <div className="flex flex-col space-y-2 text-center lg:text-left">
                        <h2 className="text-2xl font-semibold tracking-tight">Admin Login</h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access the dashboard
                        </p>
                    </div>

                    <form action={dispatch} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="admin@iccd.com"
                                required
                                className="bg-background"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••"
                                required
                                minLength={6}
                                className="bg-background"
                            />
                        </div>

                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
                            )}
                        </div>

                        <Button className="w-full" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
