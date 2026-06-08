"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CompanyFields } from "@/components/forms/fields/company-fields";
import { FormField, TextArea } from "@/components/forms/fields/form-field";
import { FormShell, ReviewBlock, WatermarkNotice } from "@/components/forms/shared/form-shell";
import { Input } from "@/components/ui/input";
import { useDocumentGenerate } from "@/components/forms/use-document-generate";
import { useSteppedForm } from "@/hooks/use-stepped-form";
import { companyDefaultValues, companySchema } from "@/lib/schemas/company";
import {
  NDA_STEPS,
  ndaDetailsSchema,
  accordConfidentialiteFormSchema,
  type AccordConfidentialiteFormValues,
} from "@/lib/schemas/accord-confidentialite";

const defaultValues: AccordConfidentialiteFormValues = {
  ...companyDefaultValues,
  recipientName: "",
  recipientAddress: "",
  recipientRole: "partenaire commercial",
  purpose: "Étude d'un projet commun et échanges préalables à une collaboration.",
  confidentialScope:
    "Données techniques, financières, commerciales, codes sources, roadmaps produit, listes clients et toute information identifiée comme confidentielle.",
  durationYears: 2,
  survivalYears: 3,
};

export function AccordConfidentialiteForm() {
  const form = useForm<AccordConfidentialiteFormValues>({
    resolver: zodResolver(accordConfidentialiteFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("accord-confidentialite");
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
      steps: NDA_STEPS,
      stepSchemas: { company: companySchema, nda: ndaDetailsSchema },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={NDA_STEPS}
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
      {currentStep.id === "nda" && (
        <>
          <FormField id="recipientName" label="Partie réceptrice" error={formState.errors.recipientName?.message}>
            <Input className="h-10" {...register("recipientName")} />
          </FormField>
          <FormField id="recipientAddress" label="Adresse" error={formState.errors.recipientAddress?.message}>
            <Input className="h-10" {...register("recipientAddress")} />
          </FormField>
          <FormField id="recipientRole" label="Qualité / rôle" error={formState.errors.recipientRole?.message}>
            <Input className="h-10" {...register("recipientRole")} />
          </FormField>
          <FormField id="purpose" label="Objet des échanges" error={formState.errors.purpose?.message}>
            <TextArea id="purpose" {...register("purpose")} />
          </FormField>
          <FormField id="confidentialScope" label="Informations couvertes" error={formState.errors.confidentialScope?.message}>
            <TextArea id="confidentialScope" {...register("confidentialScope")} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="durationYears" label="Durée de l'accord (années)" error={formState.errors.durationYears?.message}>
              <Input className="h-10" type="number" min={1} max={10} {...register("durationYears", { valueAsNumber: true })} />
            </FormField>
            <FormField id="survivalYears" label="Survie après terme (années)" error={formState.errors.survivalYears?.message}>
              <Input className="h-10" type="number" min={1} max={10} {...register("survivalYears", { valueAsNumber: true })} />
            </FormField>
          </div>
        </>
      )}
      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ReviewBlock title="NDA">
            <p>Divulgateur : {values.companyName}</p>
            <p>Réceptrice : {values.recipientName}</p>
            <p>Durée : {values.durationYears} an(s)</p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
