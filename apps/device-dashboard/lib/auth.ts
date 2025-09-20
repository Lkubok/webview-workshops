import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      authorization: {
        params: {
          prompt: "login", // Force user to re-enter credentials on each login
        },
      },
    }),
  ],
  pages: {
    signIn: "/login", // Your custom login page route
  },
  callbacks: {
    async session({ session, token, user }) {
      // Include additional token/user info if needed
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Control redirects after signin, signout etc.
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  // Any other NextAuth configs you need
};
