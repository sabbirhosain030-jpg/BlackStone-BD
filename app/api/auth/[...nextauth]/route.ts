import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;

                // Admin Hardcoded Override (Keep this for consistency)
                if (credentials.email === "admin@blackstonebd.com" && credentials.password === "admin") {
                    return { id: "1", name: "Admin", email: "admin@blackstonebd.com", role: "admin" };
                }

                try {
                    const { connectToDatabase } = require('@/lib/mongodb');
                    const db = await connectToDatabase();
                    const user = await db.collection('users').findOne({ email: credentials.email });

                    if (user && user.password === credentials.password) {
                        return {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role || 'customer'
                        };
                    }
                } catch (error) {
                    console.error("Auth error:", error);
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as 'admin' | 'customer';
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-only',
});

export { handler as GET, handler as POST };
