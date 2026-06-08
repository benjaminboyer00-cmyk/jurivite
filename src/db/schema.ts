import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const planEnum = pgEnum("plan", ["free", "pro", "business"]);

export const purchaseTypeEnum = pgEnum("purchase_type", [
  "single_doc",
  "pack_essential",
]);

export const signingStatusEnum = pgEnum("signing_status", [
  "pending",
  "signed",
  "expired",
  "cancelled",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  /** Mot de passe (bcrypt) — optionnel si connexion Google / lien magique uniquement */
  passwordHash: text("password_hash"),
  image: text("image"),
  plan: planEnum("plan").notNull().default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

export const companies = pgTable("company", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  companyName: text("company_name").notNull(),
  legalForm: text("legal_form").notNull(),
  siret: text("siret").notNull(),
  address: text("address").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const apiKeys = pgTable("api_key", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull().default("Clé principale"),
  keyHash: text("key_hash").notNull().unique(),
  keyPrefix: text("key_prefix").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  lastUsedAt: timestamp("last_used_at", { mode: "date" }),
});

/** Achats one-shot (document unitaire ou pack 3 documents) */
export const purchases = pgTable("purchase", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: purchaseTypeEnum("type").notNull(),
  stripeCheckoutSessionId: text("stripe_checkout_session_id").unique(),
  /** Crédits restants (pack uniquement) */
  documentsRemaining: integer("documents_remaining").notNull().default(0),
  /** Fin des mises à jour pour les documents du pack */
  updatesUntil: timestamp("updates_until", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/** Droit de télécharger sans filigrane + mises à jour pour un slug */
export const documentEntitlements = pgTable("document_entitlement", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  purchaseId: text("purchase_id").references(() => purchases.id, {
    onDelete: "set null",
  }),
  updatesForever: integer("updates_forever").notNull().default(0),
  updatesUntil: timestamp("updates_until", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const documents = pgTable("document", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  companyId: text("company_id").references(() => companies.id, {
    onDelete: "set null",
  }),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  fileName: text("file_name").notNull(),
  formData: jsonb("form_data").notNull(),
  hasWatermark: integer("has_watermark").notNull().default(1),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/** Lien de signature client pour contrat / devis */
export const signingRequests = pgTable("signing_request", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  documentId: text("document_id")
    .notNull()
    .references(() => documents.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  status: signingStatusEnum("status").notNull().default("pending"),
  signatureDataUrl: text("signature_data_url"),
  signedAt: timestamp("signed_at", { mode: "date" }),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  companies: many(companies),
  documents: many(documents),
  signingRequests: many(signingRequests),
  apiKeys: many(apiKeys),
  purchases: many(purchases),
  documentEntitlements: many(documentEntitlements),
}));

export const purchasesRelations = relations(purchases, ({ one, many }) => ({
  user: one(users, { fields: [purchases.userId], references: [users.id] }),
  entitlements: many(documentEntitlements),
}));

export const documentEntitlementsRelations = relations(
  documentEntitlements,
  ({ one }) => ({
    user: one(users, {
      fields: [documentEntitlements.userId],
      references: [users.id],
    }),
    purchase: one(purchases, {
      fields: [documentEntitlements.purchaseId],
      references: [purchases.id],
    }),
  }),
);

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  user: one(users, { fields: [apiKeys.userId], references: [users.id] }),
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  user: one(users, { fields: [companies.userId], references: [users.id] }),
  documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one, many }) => ({
  user: one(users, { fields: [documents.userId], references: [users.id] }),
  company: one(companies, {
    fields: [documents.companyId],
    references: [companies.id],
  }),
  signingRequests: many(signingRequests),
}));

export const signingRequestsRelations = relations(signingRequests, ({ one }) => ({
  document: one(documents, {
    fields: [signingRequests.documentId],
    references: [documents.id],
  }),
  user: one(users, {
    fields: [signingRequests.userId],
    references: [users.id],
  }),
}));
