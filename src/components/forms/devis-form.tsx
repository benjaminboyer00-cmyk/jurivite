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
  DEVIS_STEPS,
  devisDetailsSchema,
  devisFormSchema,
  type DevisFormValues,
} from "@/lib/schemas/devis";

const defaultValues: DevisFormValues = {
  ...companyDefaultValues,
  clientName: "",
  clientEmail: "",
  quoteNumber: "DEV-001",
  quoteDate: new Date().toISOString().slice(0, 10),
  validityDays: 30,
  serviceDescription: "",
  amountExclVat: 0,
  vatRate: 20,
};

export function DevisForm() {
  const form = useForm<DevisFormValues>({
    resolver: zodResolver(devisFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("devis");

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
      steps: DEVIS_STEPS,
      stepSchemas: {
        company: companySchema,
        quote: devisDetailsSchema,
      },
    });

  const values = form.watch();
  const { register, formState } = form;
  const amountTtc =
    values.amountExclVat > 0
      ? (values.amountExclVat * (1 + values.vatRate / 100)).toFixed(2)
      : "—";

  return (
    <FormShell
      steps={DEVIS_STEPS}
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

      {currentStep.id === "quote" && (
        <>
          <FormField
            id="clientName"
            label="Nom du client"
            error={formState.errors.clientName?.message}
          >
            <Input {...register("clientName")} />
          </FormField>
          <FormField
            id="clientEmail"
            label="E-mail du client (optionnel)"
            error={formState.errors.clientEmail?.message}
          >
            <Input type="email" {...register("clientEmail")} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="quoteNumber"
              label="Numéro de devis"
              error={formState.errors.quoteNumber?.message}
            >
              <Input {...register("quoteNumber")} />
            </FormField>
            <FormField
              id="quoteDate"
              label="Date du devis"
              error={formState.errors.quoteDate?.message}
            >
              <Input type="date" {...register("quoteDate")} />
            </FormField>
          </div>
          <FormField
            id="validityDays"
            label="Validité (jours)"
            error={formState.errors.validityDays?.message}
          >
            <Input
              type="number"
              min={1}
              max={90}
              {...register("validityDays", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            id="serviceDescription"
            label="Description de la prestation"
            error={formState.errors.serviceDescription?.message}
          >
            <TextArea
              id="serviceDescription"
              {...register("serviceDescription")}
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="amountExclVat"
              label="Montant HT (€)"
              error={formState.errors.amountExclVat?.message}
            >
              <Input
                type="number"
                min={0}
                step="0.01"
                {...register("amountExclVat", { valueAsNumber: true })}
              />
            </FormField>
            <FormField
              id="vatRate"
              label="TVA (%)"
              error={formState.errors.vatRate?.message}
            >
              <Input
                type="number"
                min={0}
                max={100}
                {...register("vatRate", { valueAsNumber: true })}
              />
            </FormField>
          </div>
        </>
      )}

      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ReviewBlock title="Devis">
            <p>
              N° {values.quoteNumber} — {values.quoteDate}
            </p>
            <p className="text-muted-foreground">
              Validité : {values.validityDays} jours
            </p>
            <p className="mt-2">Client : {values.clientName}</p>
            <p className="whitespace-pre-wrap">{values.serviceDescription}</p>
            <p className="mt-2 font-medium">
              {values.amountExclVat} € HT · TVA {values.vatRate} % · {amountTtc}{" "}
              € TTC
            </p>
          </ReviewBlock>
          <Separator />
          <ReviewBlock title="Émetteur">
            <p>{values.companyName}</p>
            <p className="text-muted-foreground">SIRET {values.siret}</p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
