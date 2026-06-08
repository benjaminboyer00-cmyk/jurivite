"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { CompanyFields } from "@/components/forms/fields/company-fields";
import { FormField, TextArea } from "@/components/forms/fields/form-field";
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
import { getCgvNiche } from "@/lib/documents/niches-seo";
import { companyDefaultValues, companySchema } from "@/lib/schemas/company";
import {
  CGV_FORM_STEPS,
  cgvCommercialSchema,
  cgvFormSchema,
  type CgvFormValues,
} from "@/lib/schemas/cgv";

type CgvFormProps = {
  /** Slug métier — sinon lu depuis ?metier= */
  metier?: string;
};

export function CgvForm({ metier: metierProp }: CgvFormProps) {
  const searchParams = useSearchParams();
  const metier = metierProp ?? searchParams.get("metier") ?? undefined;

  const niche = useMemo(
    () => (metier ? getCgvNiche(metier) : undefined),
    [metier],
  );

  const defaultValues: CgvFormValues = useMemo(
    () => ({
      ...companyDefaultValues,
      activityDescription: niche?.activityDescriptionDefault ?? "",
      deliveryDelay: "Sous 15 jours ouvrés après validation du devis.",
      paymentTerms:
        "Paiement à 30 % à la commande, solde à la livraison par virement bancaire.",
      withdrawalPeriodDays: 14,
      nicheSlug: niche?.slug,
    }),
    [niche],
  );

  const form = useForm<CgvFormValues>({
    resolver: zodResolver(cgvFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const generatePdf = useDocumentGenerate("cgv");

  const {
    stepIndex,
    currentStep,
    isGenerating,
    generateError,
    generateSuccess,
    stepErrorCount,
    goNext,
    goBack,
    handleGenerate,
  } = useSteppedForm({
    form,
    steps: CGV_FORM_STEPS,
    stepSchemas: {
      company: companySchema,
      commercial: cgvCommercialSchema,
    },
  });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={CGV_FORM_STEPS}
      stepIndex={stepIndex}
      onBack={goBack}
      onNext={goNext}
      onGenerate={() => handleGenerate(() => generatePdf(form.getValues()))}
      isGenerating={isGenerating}
      generateError={generateError}
      generateSuccess={generateSuccess}
      stepErrorCount={stepErrorCount}
    >
      <input type="hidden" {...register("nicheSlug")} />

      {currentStep.id === "company" && (
        <CompanyFields
          register={register}
          errors={formState.errors}
          legalForm={values.legalForm}
        />
      )}

      {currentStep.id === "commercial" && (
        <>
          <FormField
            id="activityDescription"
            label="Description de l'activité"
            error={formState.errors.activityDescription?.message}
          >
            <TextArea
              id="activityDescription"
              {...register("activityDescription")}
              placeholder={
                niche?.activityDescriptionPlaceholder ??
                "Prestations de design graphique pour TPE…"
              }
            />
          </FormField>
          <FormField
            id="deliveryDelay"
            label="Délais d'exécution / livraison"
            error={formState.errors.deliveryDelay?.message}
          >
            <Input {...register("deliveryDelay")} />
          </FormField>
          <FormField
            id="paymentTerms"
            label="Modalités de paiement"
            error={formState.errors.paymentTerms?.message}
          >
            <TextArea id="paymentTerms" {...register("paymentTerms")} />
          </FormField>
          <FormField
            id="withdrawalPeriodDays"
            label="Délai de rétractation (jours)"
            error={formState.errors.withdrawalPeriodDays?.message}
          >
            <Input
              type="number"
              min={0}
              max={30}
              {...register("withdrawalPeriodDays", { valueAsNumber: true })}
            />
          </FormField>
        </>
      )}

      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ProfessionalAdviceBanner slug="cgv" />
          {niche ? (
            <ReviewBlock title="Clauses métier">
              <p className="text-sm text-muted-foreground">
                {niche.industrySpecificClauses.length} disposition(s) spécifique(s) à{" "}
                {niche.profession.toLowerCase()} seront ajoutées au PDF.
              </p>
            </ReviewBlock>
          ) : null}
          <ReviewBlock title="Entreprise">
            <p>{values.companyName}</p>
            <p className="text-muted-foreground">{values.legalForm}</p>
            <p className="text-muted-foreground">SIRET {values.siret}</p>
            <p className="text-muted-foreground">{values.address}</p>
            <p className="text-muted-foreground">
              {values.email} · {values.phone}
            </p>
          </ReviewBlock>
          <Separator />
          <ReviewBlock title="Conditions commerciales">
            <p className="whitespace-pre-wrap">{values.activityDescription}</p>
            <p className="mt-2 text-muted-foreground">
              Délais : {values.deliveryDelay}
            </p>
            <p className="text-muted-foreground">
              Paiement : {values.paymentTerms}
            </p>
            <p className="text-muted-foreground">
              Rétractation : {values.withdrawalPeriodDays} jours
            </p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
