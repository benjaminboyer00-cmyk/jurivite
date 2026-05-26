"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormField } from "@/components/forms/fields/form-field";
import { Input } from "@/components/ui/input";
import type { BillingPaymentFields } from "@/lib/schemas/billing-payment";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors<BillingPaymentFields>;
  /** Facture : IBAN obligatoire */
  ibanRequired?: boolean;
};

export function BillingPaymentFields({
  register,
  errors,
  ibanRequired = false,
}: Props) {
  const reg = register as UseFormRegister<BillingPaymentFields>;

  return (
    <>
      <FormField
        id="bankAccountHolder"
        label="Titulaire du compte"
        hint="Raison sociale ou nom tel qu'il figure sur le RIB"
        error={errors.bankAccountHolder?.message}
      >
        <Input
          {...reg("bankAccountHolder")}
          className="h-10"
          placeholder="Ex. Studio Dupont SAS"
        />
      </FormField>
      <FormField
        id="iban"
        label={ibanRequired ? "IBAN" : "IBAN (recommandé)"}
        hint="27 caractères pour un compte français (FR…). Espaces acceptés."
        error={errors.iban?.message}
      >
        <Input
          {...reg("iban")}
          className="h-10 font-mono text-sm"
          placeholder="FR76 1234 5678 9012 3456 7890 123"
          autoComplete="off"
        />
      </FormField>
      <FormField
        id="bic"
        label="BIC / SWIFT (optionnel)"
        hint="8 ou 11 caractères — requis pour certains virements internationaux"
        error={errors.bic?.message}
      >
        <Input
          {...reg("bic")}
          className="h-10 font-mono text-sm uppercase"
          placeholder="BNPAFRPP"
          maxLength={11}
        />
      </FormField>
    </>
  );
}
