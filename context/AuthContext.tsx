'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => Promise<boolean>; // Changed to Promise
    logout: () => Promise<void>; // Changed to Promise
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextWrapper({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    const login = async (password: string): Promise<boolean> => {
        try {
            const result = await signIn("credentials", {
                username: "admin",
                password: password,
                redirect: false,
            });

            if (result?.error) {
                console.error("Login failed:", result.error);
                return false;
            }

            if (result?.ok) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("Login unexpected error:", error);
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
