import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string;
        name?: string;
        email?: string;
        role?: 'admin' | 'customer';
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: 'admin' | 'customer';
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: 'admin' | 'customer';
    }
}
