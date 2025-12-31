
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username or Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const loginId = credentials?.username?.toLowerCase();
                    const password = credentials?.password;

                    if (!loginId || !password) {
                        return null;
                    }

                    // Use require to handle the import inside the function context safely
                    const { connectToDatabase } = require('@/lib/mongodb');
                    const db = await connectToDatabase();

                    if (!db) {
                        console.error("Database connection failed during auth");
                        throw new Error("Database connection failed");
                    }

                    const usersCollection = db.collection('users');

                    // Find user by username or email (case-insensitive for username/email usually preferred)
                    const user = await usersCollection.findOne({
                        $or: [
                            { username: loginId },
                            { email: loginId }
                        ]
                    });

                    if (user) {
                        // Compare plain text password (as established in previous steps/seeding)
                        // In production, use bcrypt.compare(password, user.password)
                        if (user.password === password) {
                            return {
                                id: user._id.toString(),
                                name: user.name || user.username,
                                email: user.email,
                                role: user.role || 'admin',
                            };
                        }
                    }

                    return null;
                } catch (error) {
                    console.error("Auth Error:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
