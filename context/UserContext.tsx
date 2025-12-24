'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
}

interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const isLoading = status === 'loading';
    const isLoggedIn = !!session && session.user?.role === 'customer';

    useEffect(() => {
        if (session?.user && session.user.role === 'customer') {
            setUser({
                id: session.user.id,
                name: session.user.name || '',
                email: session.user.email || '',
            });
        } else {
            setUser(null);
        }
    }, [session]);

    return (
        <UserContext.Provider value={{ user, isLoggedIn, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
