"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormField } from "@/components/forms/fields/form-field";
import { Input } from "@/components/ui/input";
import { LEGAL_FORM_OPTIONS } from "@/lib/legal/forms";
import { classifyLegalForm } from "@/lib/legal/forms";
import type { CompanyFields } from "@/lib/schemas/company";

type CompanyFieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors<CompanyFields>;
  legalForm?: string;
};

export function CompanyFields({
  register,
  errors,
  legalForm = "",
}: CompanyFieldsProps) {
  const reg = register as UseFormRegister<CompanyFields>;
  const { isSociete, tvaMentionArticle293B } = classifyLegalForm(
    legalForm ?? "",
  );

  return (
    <>
      <FormField
        id="companyName"
        label="Nom commercial / Raison sociale"
        error={errors.companyName?.message}
      >
        <Input
          {...reg("companyName")}
          className="h-10"
          placeholder="Ex. Studio Dupont"
        />
      </FormField>
      <FormField
        id="legalForm"
        label="Forme juridique"
        hint="Adapte automatiquement les clauses TVA, capital social et mentions légales du PDF."
        error={errors.legalForm?.message}
      >
        <select
          id="legalForm"
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
          {...reg("legalForm")}
        >
          {LEGAL_FORM_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormField>

      {isSociete && (
        <>
          <FormField
            id="shareCapital"
            label="Capital social (€)"
            error={errors.shareCapital?.message}
          >
            <Input
              {...reg("shareCapital")}
              className="h-10"
              placeholder="Ex. 1 000"
            />
          </FormField>
          <FormField
            id="rcsCity"
            label="Ville du greffe (RCS)"
            hint="Ex. Paris, Lyon, Nanterre…"
            error={errors.rcsCity?.message}
          >
            <Input
              {...reg("rcsCity")}
              className="h-10"
              placeholder="Paris"
            />
          </FormField>
        </>
      )}

      {!tvaMentionArticle293B && (
        <FormField
          id="vatNumber"
          label="N° de TVA intracommunautaire (optionnel)"
          error={errors.vatNumber?.message}
        >
          <Input
            {...reg("vatNumber")}
            className="h-10"
            placeholder="FR XX XXXXXXXXX"
          />
        </FormField>
      )}

      <FormField id="siret" label="Numéro SIRET" error={errors.siret?.message}>
        <Input
          {...reg("siret")}
          className="h-10"
          inputMode="numeric"
          placeholder="14 chiffres"
        />
      </FormField>
      <FormField id="address" label="Adresse du siège" error={errors.address?.message}>
        <Input
          {...reg("address")}
          className="h-10"
          placeholder="Numéro, rue, code postal, ville"
        />
      </FormField>
      <FormField id="email" label="E-mail" error={errors.email?.message}>
        <Input
          type="email"
          {...reg("email")}
          className="h-10"
          placeholder="contact@monentreprise.fr"
        />
      </FormField>
      <FormField id="phone" label="Téléphone" error={errors.phone?.message}>
        <Input
          type="tel"
          {...reg("phone")}
          className="h-10"
          placeholder="06 12 34 56 78"
        />
      </FormField>
    </>
  );
}
