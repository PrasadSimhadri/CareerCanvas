'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
    slug: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/me', {
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                if (data.user) {
                    setUser({
                        id: data.user._id,
                        username: data.user.username,
                        email: data.user.email,
                        slug: data.user.slug,
                    });
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setUser({
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email,
                    slug: data.user.slug,
                });
                return { success: true };
            }

            return { success: false, error: data.error };
        } catch {
            return { success: false, error: 'Network error' };
        }
    };

    const signup = async (username: string, email: string, password: string) => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setUser({
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email,
                    slug: data.user.slug,
                });
                return { success: true };
            }

            return { success: false, error: data.error };
        } catch {
            return { success: false, error: 'Network error' };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
        } catch {
            console.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
