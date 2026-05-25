import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { z } from "zod";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { normalizeEmail, isValidEmailFormat } from "@/lib/auth/email";
import { verifyPassword } from "@/lib/auth/password";
import { safeCallbackUrl } from "@/lib/auth/safe-redirect";
import { findUserByEmail } from "@/lib/auth/user-repository";
import type { Plan } from "@/lib/plans";

const providers: Provider[] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false,
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

providers.push(
  Credentials({
    id: "credentials",
    name: "E-mail et mot de passe",
    credentials: {
      email: { label: "E-mail", type: "email" },
      password: { label: "Mot de passe", type: "password" },
    },
    async authorize(credentials) {
      if (!db) return null;

      const parsed = z
        .object({
          email: z.string().min(3),
          password: z.string().min(8).max(128),
        })
        .safeParse(credentials);

      if (!parsed.success) return null;

      const email = normalizeEmail(parsed.data.email);
      const user = await findUserByEmail(email);

      if (!user?.passwordHash) return null;

      const valid = await verifyPassword(
        parsed.data.password,
        user.passwordHash,
      );
      if (!valid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  }),
);

const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? "dev-only-secret-change-in-env-local"
    : undefined);

if (!authSecret && process.env.NODE_ENV === "production") {
  throw new Error(
    "AUTH_SECRET (ou NEXTAUTH_SECRET) est obligatoire en production.",
  );
}

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
    error: "/login",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !db) return true;

      const email = normalizeEmail(user.email);

      if (account?.provider === "credentials") {
        return true;
      }

      const existing = await findUserByEmail(email);

      if (existing && user.id && existing.id !== user.id) {
        return "/login?error=OAuthAccountNotLinked";
      }

      if (existing && !user.id) {
        return "/login?error=EmailAlreadyRegistered";
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${safeCallbackUrl(url, baseUrl)}`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user, trigger }) {
      if (user?.id) token.id = user.id;

      if (token.id && db && (user?.id || trigger === "update")) {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, token.id as string),
        });
        token.plan = (dbUser?.plan ?? "free") as Plan;
        token.email = dbUser?.email;
        token.hasPassword = Boolean(dbUser?.passwordHash);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.plan = (token.plan as Plan | undefined) ?? "free";
        session.user.hasPassword = Boolean(token.hasPassword);
        if (token.email) {
          session.user.email = token.email as string;
        }
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.email || !db || !user.id) return;
      const normalized = normalizeEmail(user.email);
      if (normalized !== user.email) {
        await db
          .update(users)
          .set({ email: normalized })
          .where(eq(users.id, user.id));
      }
    },
  },
  trustHost: true,
});

export { isValidEmailFormat, normalizeEmail };
