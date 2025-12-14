import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // Only allow if token exists (user is logged in)
            // We can also check role here: return token?.role === "admin"
            return !!token;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-only'
})

export const config = { matcher: ["/admin/:path*"] }
