"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CompanyFields } from "@/components/forms/fields/company-fields";
import { FormField, TextArea } from "@/components/forms/fields/form-field";
import {
  FormShell,
  ReviewBlock,
  WatermarkNotice,
} from "@/components/forms/shared/form-shell";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDocumentGenerate } from "@/components/forms/use-document-generate";
import { useSteppedForm } from "@/hooks/use-stepped-form";
import { companyDefaultValues, companySchema } from "@/lib/schemas/company";
import {
  POLITIQUE_CONFIDENTIALITE_STEPS,
  politiqueConfidentialiteFormSchema,
  rgpdDetailsSchema,
  type PolitiqueConfidentialiteFormValues,
} from "@/lib/schemas/politique-confidentialite";

const defaultValues: PolitiqueConfidentialiteFormValues = {
  ...companyDefaultValues,
  websiteUrl: "https://",
  dataCollected:
    "Nom, e-mail, message via formulaire de contact. Cookies analytics (Google Analytics).",
  processingPurpose:
    "Répondre aux demandes de contact et mesurer l'audience du site.",
  retentionPeriod: "3 ans à compter du dernier contact.",
  dpoEmail: "",
};

export function PolitiqueConfidentialiteForm() {
  const form = useForm<PolitiqueConfidentialiteFormValues>({
    resolver: zodResolver(politiqueConfidentialiteFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("politique-confidentialite");

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
      steps: POLITIQUE_CONFIDENTIALITE_STEPS,
      stepSchemas: {
        company: companySchema,
        rgpd: rgpdDetailsSchema,
      },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={POLITIQUE_CONFIDENTIALITE_STEPS}
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
        <CompanyFields register={register} errors={formState.errors} />
      )}

      {currentStep.id === "rgpd" && (
        <>
          <FormField
            id="websiteUrl"
            label="URL du site concerné"
            error={formState.errors.websiteUrl?.message}
          >
            <Input type="url" {...register("websiteUrl")} />
          </FormField>
          <FormField
            id="dataCollected"
            label="Données collectées"
            error={formState.errors.dataCollected?.message}
          >
            <TextArea
              id="dataCollected"
              {...register("dataCollected")}
              placeholder="Formulaire, cookies, newsletter…"
            />
          </FormField>
          <FormField
            id="processingPurpose"
            label="Finalités du traitement"
            error={formState.errors.processingPurpose?.message}
          >
            <TextArea id="processingPurpose" {...register("processingPurpose")} />
          </FormField>
          <FormField
            id="retentionPeriod"
            label="Durée de conservation"
            error={formState.errors.retentionPeriod?.message}
          >
            <Input {...register("retentionPeriod")} />
          </FormField>
          <FormField
            id="dpoEmail"
            label="Contact DPO / confidentialité (optionnel)"
            error={formState.errors.dpoEmail?.message}
          >
            <Input
              type="email"
              {...register("dpoEmail")}
              placeholder="dpo@monentreprise.fr"
            />
          </FormField>
        </>
      )}

      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ReviewBlock title="Responsable">
            <p>{values.companyName}</p>
            <p className="text-muted-foreground">{values.email}</p>
          </ReviewBlock>
          <Separator />
          <ReviewBlock title="Traitement">
            <p className="text-muted-foreground">{values.websiteUrl}</p>
            <p className="mt-2 whitespace-pre-wrap">{values.dataCollected}</p>
            <p className="mt-2 text-muted-foreground">
              {values.processingPurpose}
            </p>
            <p className="text-muted-foreground">
              Conservation : {values.retentionPeriod}
            </p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
