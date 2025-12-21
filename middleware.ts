import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // Allow access to login page without token
            if (req.nextUrl.pathname === "/admin/login") {
                return true;
            }
            // Only allow if token exists (user is logged in)
            return !!token;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-only'
})

export const config = { matcher: ["/admin/:path*"] }
