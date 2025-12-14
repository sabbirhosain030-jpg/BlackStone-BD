'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AdminSidebar from '@/components/admin/Sidebar';
import { LogOut } from 'lucide-react';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, logout, isLoading } = useAuth(); // Destructure isLoading

    useEffect(() => {
        // Don't modify redirect logic too much, rely on middleware for hard protection
        // But keep client-side check for smoother UX
        if (isLoading) return;

        if (pathname === '/admin/login') return;

        if (!isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, isLoading, router, pathname]);

    if (isLoading) {
        return <div className="min-h-screen bg-premium-black flex items-center justify-center text-premium-gold">Loading...</div>;
    }

    // Allow login page to render without authentication
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Don't render admin layout if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-premium-black">
            <AdminSidebar />
            <div className="flex-1 overflow-auto">
                <header className="bg-premium-charcoal shadow-md border-b border-gray-800 h-16 flex items-center justify-between px-8">
                    <h2 className="text-xl font-bold text-white font-playfair">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full bg-premium-gold flex items-center justify-center text-premium-black font-bold border border-white/10">
                            A
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium border border-red-500/20"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </header>
                <main className="p-8 bg-premium-black text-white">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}
