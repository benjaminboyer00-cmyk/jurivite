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
import { useSteppedForm } from "@/hooks/use-stepped-form";
import { companyDefaultValues, companySchema } from "@/lib/schemas/company";
import {
  CGV_FORM_STEPS,
  cgvCommercialSchema,
  cgvFormSchema,
  type CgvFormValues,
} from "@/lib/schemas/cgv";

const defaultValues: CgvFormValues = {
  ...companyDefaultValues,
  activityDescription: "",
  deliveryDelay: "Sous 15 jours ouvrés après validation du devis.",
  paymentTerms:
    "Paiement à 30 % à la commande, solde à la livraison par virement bancaire.",
  withdrawalPeriodDays: 14,
};

export function CgvForm() {
  const form = useForm<CgvFormValues>({
    resolver: zodResolver(cgvFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { stepIndex, currentStep, isGenerating, goNext, goBack, handleGenerate } =
    useSteppedForm({
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
      onGenerate={() =>
        handleGenerate(
          "Génération PDF à venir (Puppeteer). Vos données CGV sont prêtes.",
        )
      }
      isGenerating={isGenerating}
    >
      {currentStep.id === "company" && (
        <CompanyFields register={register} errors={formState.errors} />
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
              placeholder="Prestations de design graphique pour TPE…"
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
