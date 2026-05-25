import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

const providers: Provider[] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (process.env.RESEND_API_KEY) {
  providers.push(
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM ?? "JuriVite <onboarding@resend.dev>",
    }),
  );
}

const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? "dev-only-secret-change-in-env-local"
    : undefined);

const authUrl =
  process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  adapter: db
    ? DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      })
    : undefined,
  providers,
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (path.startsWith("/dashboard") || path.startsWith("/admin")) {
        return !!auth;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;

      if (token.id && db) {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, token.id as string),
        });
        token.plan = dbUser?.plan ?? "free";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.plan = (token.plan as "free" | "pro") ?? "free";
      }
      return session;
    },
  },
  trustHost: true,
});
