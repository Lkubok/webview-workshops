import KeycloakProvider from "next-auth/providers/keycloak";
// import type { NextAuthOptions } from "next-auth";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      authorization: {
        params: {
          prompt: "login",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // 1️⃣ This runs on login / refresh, and we capture the raw access_token
    async jwt({ token, account, profile }) {
      if (account) {
        // Store the access_token in the JWT
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    // 2️⃣ This runs whenever `useSession()` is called, attach the token to the session
    async session({ session, token }) {
      // attach raw JWT to session
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
};
