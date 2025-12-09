'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AdminSidebar from '@/components/admin/Sidebar';
import { LogOut } from 'lucide-react';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        // Don't redirect on login page
        if (pathname === '/admin/login') return;

        // Check if user is not authenticated and redirect to login
        if (!isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, router, pathname]);

    // Allow login page to render without authentication
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Don't render admin layout if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </header>
                <main className="p-8">
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
