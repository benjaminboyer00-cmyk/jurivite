import { z } from "zod";

import { bicSchema, ibanSchema, optionalIbanSchema } from "@/lib/schemas/iban";

/** Coordonnées bancaires — factures et devis professionnels */
export const billingPaymentRequiredSchema = z.object({
  iban: ibanSchema,
  bic: bicSchema,
  bankAccountHolder: z
    .string()
    .min(2, "Indiquez le titulaire du compte")
    .max(120),
});

export const billingPaymentOptionalSchema = z.object({
  iban: optionalIbanSchema,
  bic: bicSchema,
  bankAccountHolder: z.string().max(120),
});

export type BillingPaymentFields = z.infer<typeof billingPaymentRequiredSchema>;

export const billingPaymentDefaults = {
  iban: "",
  bic: "",
  bankAccountHolder: "",
} as const;
