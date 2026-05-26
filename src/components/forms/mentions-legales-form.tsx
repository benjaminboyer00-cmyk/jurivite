"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CompanyFields } from "@/components/forms/fields/company-fields";
import { FormField } from "@/components/forms/fields/form-field";
import {
  FormShell,
  ReviewBlock,
  WatermarkNotice,
} from "@/components/forms/shared/form-shell";
import { ProfessionalAdviceBanner } from "@/components/legal/professional-advice-banner";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDocumentGenerate } from "@/components/forms/use-document-generate";
import { useSteppedForm } from "@/hooks/use-stepped-form";
import { companyDefaultValues, companySchema } from "@/lib/schemas/company";
import {
  MENTIONS_LEGALES_STEPS,
  mentionsLegalesFormSchema,
  mentionsLegalesSiteSchema,
  type MentionsLegalesFormValues,
} from "@/lib/schemas/mentions-legales";

const defaultValues: MentionsLegalesFormValues = {
  ...companyDefaultValues,
  websiteUrl: "https://",
  siteName: "",
  directorName: "",
  hostingProvider: "OVH",
  hostingAddress: "",
};

export function MentionsLegalesForm() {
  const form = useForm<MentionsLegalesFormValues>({
    resolver: zodResolver(mentionsLegalesFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("mentions-legales");

  const {
    stepIndex,
    currentStep,
    isGenerating,
    generateError,
    goNext,
    goBack,
    handleGenerate,
  } = useSteppedForm({
      form,
      steps: MENTIONS_LEGALES_STEPS,
      stepSchemas: {
        company: companySchema,
        site: mentionsLegalesSiteSchema,
      },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={MENTIONS_LEGALES_STEPS}
      stepIndex={stepIndex}
      onBack={goBack}
      onNext={goNext}
      onGenerate={() =>
        handleGenerate(() => generatePdf(form.getValues()))
      }
      isGenerating={isGenerating}
      generateError={generateError}
    >
      {currentStep.id === "company" && (
        <CompanyFields
          register={register}
          errors={formState.errors}
          legalForm={values.legalForm}
        />
      )}

      {currentStep.id === "site" && (
        <>
          <FormField
            id="websiteUrl"
            label="URL du site"
            error={formState.errors.websiteUrl?.message}
          >
            <Input
              type="url"
              {...register("websiteUrl")}
              placeholder="https://monsite.fr"
            />
          </FormField>
          <FormField
            id="siteName"
            label="Nom du site"
            error={formState.errors.siteName?.message}
          >
            <Input {...register("siteName")} placeholder="Mon Portfolio" />
          </FormField>
          <FormField
            id="directorName"
            label="Directeur de publication"
            error={formState.errors.directorName?.message}
          >
            <Input {...register("directorName")} placeholder="Prénom Nom" />
          </FormField>
          <FormField
            id="hostingProvider"
            label="Hébergeur *"
            hint="Nom commercial du prestataire qui héberge votre site (LCEN)"
            error={formState.errors.hostingProvider?.message}
          >
            <Input
              {...register("hostingProvider")}
              placeholder="OVHcloud, Hetzner, Vercel, o2switch…"
            />
          </FormField>
          <FormField
            id="hostingAddress"
            label="Adresse postale de l'hébergeur *"
            hint="Adresse figurant sur le contrat ou les mentions légales du prestataire"
            error={formState.errors.hostingAddress?.message}
          >
            <Input
              {...register("hostingAddress")}
              placeholder="2 rue Kellermann, 59100 Roubaix, France"
            />
          </FormField>
        </>
      )}

      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ProfessionalAdviceBanner slug="mentions-legales" />
          <ReviewBlock title="Entreprise">
            <p>{values.companyName} — {values.legalForm}</p>
            <p className="text-muted-foreground">SIRET {values.siret}</p>
            <p className="text-muted-foreground">{values.address}</p>
            <p className="text-muted-foreground">
              {values.email} · {values.phone}
            </p>
          </ReviewBlock>
          <Separator />
          <ReviewBlock title="Site web">
            <p>{values.siteName}</p>
            <p className="text-muted-foreground">{values.websiteUrl}</p>
            <p className="text-muted-foreground">
              Directeur : {values.directorName}
            </p>
            <p className="text-muted-foreground">
              Hébergeur : {values.hostingProvider}
            </p>
            <p className="text-muted-foreground">{values.hostingAddress}</p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
