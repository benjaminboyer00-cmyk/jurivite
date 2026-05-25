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
    goNext,
    goBack,
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
    >
      {currentStep.id === "company" && (
        <CompanyFields register={register} errors={formState.errors} />
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
            error={formState.errors.serviceDescription?.message}
          >
            <TextArea
              id="serviceDescription"
              {...register("serviceDescription")}
            />
          </FormField>
          <FormField id="price" label="Prix / forfait" error={formState.errors.price?.message}>
            <Input {...register("price")} placeholder="2 500 € HT" />
          </FormField>
          <FormField
            id="paymentTerms"
            label="Modalités de paiement"
            error={formState.errors.paymentTerms?.message}
          >
            <TextArea id="paymentTerms" {...register("paymentTerms")} />
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
          <ReviewBlock title="Prestataire">
            <p>{values.companyName}</p>
            <p className="text-muted-foreground">SIRET {values.siret}</p>
          </ReviewBlock>
          <Separator />
          <ReviewBlock title="Mission">
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
