"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormField } from "@/components/forms/fields/form-field";
import { Input } from "@/components/ui/input";
import { LEGAL_FORM_OPTIONS } from "@/lib/legal/forms";
import { classifyLegalForm } from "@/lib/legal/forms";
import type { CompanyFields } from "@/lib/schemas/company";
import { normalizeRna } from "@/lib/schemas/rna";
import { normalizeSiretInput } from "@/lib/schemas/siret";

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
  const classification = classifyLegalForm(legalForm ?? "");
  const { isSociete, isAssociation, isEntrepriseIndividuelle, tvaMentionArticle293B } =
    classification;

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

      {(isEntrepriseIndividuelle || classification.isProfessionLiberale) && (
        <FormField
          id="franchiseTva"
          label="Régime TVA"
          hint="Micro/AE : franchise en base par défaut. EI : cochez si vous êtes en franchise (art. 293 B), sinon renseignez le n° de TVA."
        >
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 rounded border-input"
              {...reg("franchiseTva", {
                setValueAs: (v) => v === true || v === "true" || v === "on",
              })}
            />
            Franchise en base de TVA — art. 293 B du CGI
          </label>
        </FormField>
      )}

      {isAssociation && (
        <FormField
          id="rnaNumber"
          label="N° RNA (association) *"
          hint="Répertoire national des associations — obligatoire (format W + 9 chiffres, ex. W751234567)"
          error={errors.rnaNumber?.message}
        >
          <Input
            {...reg("rnaNumber", {
              setValueAs: (v) => (v ? normalizeRna(String(v)) : ""),
            })}
            className="h-10 font-mono uppercase"
            placeholder="W751234567"
            maxLength={10}
          />
        </FormField>
      )}

      {!tvaMentionArticle293B && (
        <FormField
          id="vatNumber"
          label="N° de TVA intracommunautaire"
          hint="Obligatoire si vous êtes assujetti à la TVA (hors franchise 293 B)"
          error={errors.vatNumber?.message}
        >
          <Input
            {...reg("vatNumber")}
            className="h-10"
            placeholder="FR XX XXXXXXXXX"
          />
        </FormField>
      )}

      <FormField
        id="siret"
        label="Numéro SIRET"
        hint="14 chiffres — espaces et tirets acceptés (ex. 123 456 789 00012)"
        error={errors.siret?.message}
      >
        <Input
          {...reg("siret", {
            setValueAs: (value) => normalizeSiretInput(value),
          })}
          className="h-10"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={20}
          placeholder="00000000000000"
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
