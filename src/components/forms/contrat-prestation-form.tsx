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
  CONTRAT_PRESTATION_STEPS,
  contratClientSchema,
  contratPrestationFormSchema,
  type ContratPrestationFormValues,
} from "@/lib/schemas/contrat-prestation";

const PAYMENT_PRESETS = [
  "50 % à la commande, 50 % à la livraison par virement.",
  "100 % à la livraison, paiement sous 30 jours.",
  "30 % à la commande, solde à la livraison par virement.",
] as const;

const defaultValues: ContratPrestationFormValues = {
  ...companyDefaultValues,
  clientName: "",
  clientAddress: "",
  serviceDescription: "",
  price: "",
  paymentTerms: "50 % à la commande, 50 % à la livraison par virement.",
  deliveryDate: "30 jours après signature",
};

export function ContratPrestationForm() {
  const form = useForm<ContratPrestationFormValues>({
    resolver: zodResolver(contratPrestationFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("contrat-prestation");

  const {
    stepIndex,
    currentStep,
    isGenerating,
    generateError,
    generateSuccess,
    stepErrorCount,
    goNext,
    goBack,
    goToStep,
    handleGenerate,
  } = useSteppedForm({
      form,
      steps: CONTRAT_PRESTATION_STEPS,
      stepSchemas: {
        company: companySchema,
        contract: contratClientSchema,
      },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={CONTRAT_PRESTATION_STEPS}
      stepIndex={stepIndex}
      onBack={goBack}
      onNext={goNext}
      onGenerate={() =>
        handleGenerate(() => generatePdf(form.getValues()))
      }
      isGenerating={isGenerating}
      generateError={generateError}
      generateSuccess={generateSuccess}
      stepErrorCount={stepErrorCount}
    >
      {currentStep.id === "company" && (
        <CompanyFields
          register={register}
          errors={formState.errors}
          legalForm={values.legalForm}
        />
      )}

      {currentStep.id === "contract" && (
        <>
          <FormField
            id="clientName"
            label="Nom du client"
            error={formState.errors.clientName?.message}
          >
            <Input {...register("clientName")} />
          </FormField>
          <FormField
            id="clientAddress"
            label="Adresse du client"
            error={formState.errors.clientAddress?.message}
          >
            <Input {...register("clientAddress")} />
          </FormField>
          <FormField
            id="serviceDescription"
            label="Description de la prestation"
            hint="Détaillez le périmètre, les livrables et ce qui est hors scope."
            error={formState.errors.serviceDescription?.message}
          >
            <TextArea
              id="serviceDescription"
              placeholder="Ex. Nettoyage vitres et baies vitrées — 2 passages, produits fournis par le client…"
              {...register("serviceDescription")}
            />
          </FormField>
          <FormField id="price" label="Prix / forfait" error={formState.errors.price?.message}>
            <Input {...register("price")} placeholder="2 500 € HT ou 150 € TTC / intervention" />
          </FormField>
          <FormField
            id="paymentTerms"
            label="Modalités de paiement"
            hint="Cliquez sur un modèle ou personnalisez."
            error={formState.errors.paymentTerms?.message}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {PAYMENT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className="rounded-full border bg-background px-3 py-1.5 text-left text-xs transition-colors hover:border-primary hover:bg-primary/5"
                    onClick={() => form.setValue("paymentTerms", preset, { shouldDirty: true })}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <TextArea id="paymentTerms" {...register("paymentTerms")} />
            </div>
          </FormField>
          <FormField
            id="deliveryDate"
            label="Date ou délai de livraison"
            error={formState.errors.deliveryDate?.message}
          >
            <Input {...register("deliveryDate")} />
          </FormField>
        </>
      )}

      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ReviewBlock title="Prestataire" onEdit={() => goToStep(0)}>
            <p>{values.companyName}</p>
            <p className="text-muted-foreground">SIRET {values.siret}</p>
          </ReviewBlock>
          <Separator />
          <ReviewBlock title="Mission" onEdit={() => goToStep(1)}>
            <p>Client : {values.clientName}</p>
            <p className="text-muted-foreground">{values.clientAddress}</p>
            <p className="mt-2 whitespace-pre-wrap">
              {values.serviceDescription}
            </p>
            <p className="mt-2 font-medium">{values.price}</p>
            <p className="text-muted-foreground">{values.paymentTerms}</p>
            <p className="text-muted-foreground">
              Livraison : {values.deliveryDate}
            </p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
