'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>; // Changed to Promise
    logout: () => Promise<void>; // Changed to Promise
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextWrapper({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
        try {
            console.log("🔐 Attempting login with:", usernameOrEmail);
            const result = await signIn("credentials", {
                username: usernameOrEmail, // Pass to 'username' field in credentials, which NextAuth will handle
                password: password,
                redirect: false,
            });

            console.log("📊 SignIn result:", result);

            if (result?.error) {
                console.error("❌ Login failed:", result.error);
                return false;
            }

            if (result?.ok) {
                console.log("✅ Login successful");
                return true;
            }

            console.warn("⚠️ Login result uncertain");
            return false;
        } catch (error) {
            console.error("💥 Login unexpected error:", error);
            return false;
        }
    };

    const logout = async () => {
        await signOut({ redirect: false });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthContextWrapper>
                {children}
            </AuthContextWrapper>
        </SessionProvider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
