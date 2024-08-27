import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin',
        signOut : '/admin'
    },
    
    session: {
        strategy: 'jwt',
    },

    callbacks: {
        authorized({ auth }) {
            const isAuthenticated = !!auth?.user;

            return isAuthenticated;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl+  "/admin/compensation"; // Modify this to your desired path
          }
    },

    providers: [],
} satisfies NextAuthConfig;