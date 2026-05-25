import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormField } from "@/components/forms/fields/form-field";
import { Input } from "@/components/ui/input";
import type { CompanyFields } from "@/lib/schemas/company";

type CompanyFieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors<CompanyFields>;
};

export function CompanyFields({ register, errors }: CompanyFieldsProps) {
  const reg = register as UseFormRegister<CompanyFields>;

  return (
    <>
      <FormField
        id="companyName"
        label="Nom commercial / Raison sociale"
        error={errors.companyName?.message}
      >
        <Input {...reg("companyName")} placeholder="Ex. Studio Dupont" />
      </FormField>
      <FormField
        id="legalForm"
        label="Forme juridique"
        error={errors.legalForm?.message}
      >
        <Input {...reg("legalForm")} placeholder="Micro-entreprise, SASU, EURL…" />
      </FormField>
      <FormField id="siret" label="Numéro SIRET" error={errors.siret?.message}>
        <Input
          {...reg("siret")}
          inputMode="numeric"
          placeholder="14 chiffres"
        />
      </FormField>
      <FormField id="address" label="Adresse du siège" error={errors.address?.message}>
        <Input
          {...reg("address")}
          placeholder="Numéro, rue, code postal, ville"
        />
      </FormField>
      <FormField id="email" label="E-mail" error={errors.email?.message}>
        <Input
          type="email"
          {...reg("email")}
          placeholder="contact@monentreprise.fr"
        />
      </FormField>
      <FormField id="phone" label="Téléphone" error={errors.phone?.message}>
        <Input type="tel" {...reg("phone")} placeholder="06 12 34 56 78" />
      </FormField>
    </>
  );
}
