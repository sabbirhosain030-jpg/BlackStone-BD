
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username or Email", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log("🔐 NextAuth authorize called");
                // 'username' field can contain either username or email
                const creds = credentials as any;
                const loginId = creds?.username || creds?.email;
                const password = credentials?.password;

                console.log("📥 Received credentials:", {
                    loginId,
                    hasPassword: !!password
                });

                if (!loginId || !password) {
                    console.log("❌ Missing credentials");
                    return null;
                }

                // 1. First, try Database Authentication (for changed passwords)
                try {
                    // Use require to avoid circular dependency or import issues if needed, but standard import is better if lib/mongodb is clean
                    const { connectToDatabase } = require('@/lib/mongodb');
                    const db = await connectToDatabase();

                    if (db) {
                        console.log("🗄️ Database connected, checking for user...");
                        const usersCollection = db.collection('users');
                        const user = await usersCollection.findOne({
                            $or: [
                                { username: loginId },
                                { email: loginId }
                            ]
                        });

                        if (user) {
                            console.log("👤 User found in DB:", user.username);
                            // In production, compare hashed password. For now, simple check
                            if (user.password === password) {
                                console.log("✅ Database login successful!");
                                return {
                                    id: user._id.toString(),
                                    name: user.name,
                                    email: user.email,
                                    role: user.role || 'customer'
                                };
                            } else {
                                console.log("❌ Database password mismatch");
                            }
                        } else {
                            console.log("⚠️ User not found in database");
                        }
                    }
                } catch (error) {
                    console.error("💥 Auth database connect/check error (ignoring for hardcoded fallback):", error);
                }

                // 2. Fallback: Hardcoded Admin (if DB failed or user not found/matched)
                console.log("🔍 Checking hardcoded admin credentials as fallback...");
                if ((loginId === "admin" || loginId === "admin@blackstonebd.com") && password === "BlackStone2024!") {
                    console.log("✅ Admin hardcoded login successful!");
                    return { id: "1", name: "Admin", email: "admin@blackstonebd.com", role: "admin" };
                }

                console.log("❌ All authentication methods failed");
                return null;
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
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
};
