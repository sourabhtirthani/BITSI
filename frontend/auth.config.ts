import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin',
        signOut : '/admin'
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: 'jwt',
    },

    callbacks: {
        authorized({ auth }) {
            const isAuthenticated = !!auth?.user;

            return isAuthenticated;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl+  "/admin/compensation"; 
          }
    },

    providers: [],
} satisfies NextAuthConfig;