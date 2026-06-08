"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { BillingPaymentFields } from "@/components/forms/fields/billing-payment-fields";
import { CompanyFields } from "@/components/forms/fields/company-fields";
import { FormField, TextArea } from "@/components/forms/fields/form-field";
import { ProfessionalAdviceBanner } from "@/components/legal/professional-advice-banner";
import {
  FormShell,
  ReviewBlock,
  WatermarkNotice,
} from "@/components/forms/shared/form-shell";
import { Input } from "@/components/ui/input";
import { useDocumentGenerate } from "@/components/forms/use-document-generate";
import { useSteppedForm } from "@/hooks/use-stepped-form";
import { billingPaymentDefaults } from "@/lib/schemas/billing-payment";
import { companyDefaultValues, companySchema } from "@/lib/schemas/company";
import {
  FACTURE_STEPS,
  factureDetailsSchema,
  factureFormSchema,
  type FactureFormValues,
} from "@/lib/schemas/facture";

const defaultValues: FactureFormValues = {
  ...companyDefaultValues,
  ...billingPaymentDefaults,
  clientName: "",
  clientAddress: "",
  invoiceNumber: `FAC-${new Date().getFullYear()}-001`,
  invoiceDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  serviceDescription: "",
  amountExclVat: 0,
  vatRate: 20,
  paymentTerms: "Échéance : 30 jours à réception de facture.",
};

export function FactureForm() {
  const form = useForm<FactureFormValues>({
    resolver: zodResolver(factureFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("facture");
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
  } =
    useSteppedForm({
      form,
      steps: FACTURE_STEPS,
      stepSchemas: { company: companySchema, invoice: factureDetailsSchema },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={FACTURE_STEPS}
      stepIndex={stepIndex}
      onBack={goBack}
      onNext={goNext}
      onGenerate={() => handleGenerate(() => generatePdf(form.getValues()))}
      isGenerating={isGenerating}
      generateError={generateError}
      generateSuccess={generateSuccess}
      stepErrorCount={stepErrorCount}
    >
      {currentStep.id === "company" && (
        <CompanyFields register={register} errors={formState.errors} legalForm={values.legalForm} />
      )}
      {currentStep.id === "invoice" && (
        <>
          <FormField id="clientName" label="Nom du client" error={formState.errors.clientName?.message}>
            <Input className="h-10" {...register("clientName")} />
          </FormField>
          <FormField id="clientAddress" label="Adresse du client" error={formState.errors.clientAddress?.message}>
            <Input className="h-10" {...register("clientAddress")} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="invoiceNumber" label="N° de facture" error={formState.errors.invoiceNumber?.message}>
              <Input className="h-10" {...register("invoiceNumber")} />
            </FormField>
            <FormField id="invoiceDate" label="Date d'émission" error={formState.errors.invoiceDate?.message}>
              <Input className="h-10" type="date" {...register("invoiceDate")} />
            </FormField>
          </div>
          <FormField id="dueDate" label="Date d'échéance" error={formState.errors.dueDate?.message}>
            <Input className="h-10" type="date" {...register("dueDate")} />
          </FormField>
          <FormField id="serviceDescription" label="Prestation facturée" error={formState.errors.serviceDescription?.message}>
            <TextArea id="serviceDescription" {...register("serviceDescription")} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="amountExclVat" label="Montant HT (€)" error={formState.errors.amountExclVat?.message}>
              <Input className="h-10" type="number" step="0.01" {...register("amountExclVat", { valueAsNumber: true })} />
            </FormField>
            <FormField id="vatRate" label="TVA (%)" error={formState.errors.vatRate?.message}>
              <Input className="h-10" type="number" {...register("vatRate", { valueAsNumber: true })} />
            </FormField>
          </div>
          <BillingPaymentFields
            register={register}
            errors={formState.errors}
            ibanRequired
          />
          <FormField
            id="paymentTerms"
            label="Délai et conditions complémentaires"
            hint="Ex. échéance, acompte, pénalités convenues — l'IBAN figure automatiquement sur le PDF"
            error={formState.errors.paymentTerms?.message}
          >
            <TextArea id="paymentTerms" {...register("paymentTerms")} />
          </FormField>
        </>
      )}
      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ProfessionalAdviceBanner slug="facture" />
          <ReviewBlock title="Facture">
            <p>N° {values.invoiceNumber} — émise le {values.invoiceDate}</p>
            <p>Client : {values.clientName}</p>
            <p className="font-medium">{values.amountExclVat} € HT · TVA {values.vatRate} %</p>
            {values.iban ? (
              <p className="mt-2 text-muted-foreground">IBAN renseigné — affiché sur le PDF</p>
            ) : null}
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
