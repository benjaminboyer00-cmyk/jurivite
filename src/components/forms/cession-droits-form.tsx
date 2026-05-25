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
  CESSION_DROITS_STEPS,
  cessionDetailsSchema,
  cessionDroitsFormSchema,
  type CessionDroitsFormValues,
} from "@/lib/schemas/cession-droits-auteur";

const defaultValues: CessionDroitsFormValues = {
  ...companyDefaultValues,
  clientName: "",
  clientAddress: "",
  workTitle: "",
  workDescription: "",
  exploitationMedia: "Site web, réseaux sociaux, supports marketing print et digital",
  territory: "Monde entier",
  duration: "Durée légale de protection des droits d'auteur",
  assignmentPrice: "",
  paymentTerms: "Paiement à la signature par virement bancaire.",
};

export function CessionDroitsForm() {
  const form = useForm<CessionDroitsFormValues>({
    resolver: zodResolver(cessionDroitsFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("cession-droits-auteur");
  const { stepIndex, currentStep, isGenerating, generateError, goNext, goBack, handleGenerate } =
    useSteppedForm({
      form,
      steps: CESSION_DROITS_STEPS,
      stepSchemas: { company: companySchema, cession: cessionDetailsSchema },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={CESSION_DROITS_STEPS}
      stepIndex={stepIndex}
      onBack={goBack}
      onNext={goNext}
      onGenerate={() => handleGenerate(() => generatePdf(form.getValues()))}
      isGenerating={isGenerating}
      generateError={generateError}
    >
      {currentStep.id === "company" && (
        <CompanyFields register={register} errors={formState.errors} legalForm={values.legalForm} />
      )}
      {currentStep.id === "cession" && (
        <>
          <FormField id="clientName" label="Cessionnaire (client)" error={formState.errors.clientName?.message}>
            <Input className="h-10" {...register("clientName")} />
          </FormField>
          <FormField id="clientAddress" label="Adresse du cessionnaire" error={formState.errors.clientAddress?.message}>
            <Input className="h-10" {...register("clientAddress")} />
          </FormField>
          <FormField id="workTitle" label="Titre de l'œuvre" error={formState.errors.workTitle?.message}>
            <Input className="h-10" {...register("workTitle")} />
          </FormField>
          <FormField id="workDescription" label="Description de l'œuvre" error={formState.errors.workDescription?.message}>
            <TextArea id="workDescription" {...register("workDescription")} />
          </FormField>
          <FormField id="exploitationMedia" label="Supports d'exploitation" error={formState.errors.exploitationMedia?.message}>
            <TextArea id="exploitationMedia" {...register("exploitationMedia")} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="territory" label="Territoire" error={formState.errors.territory?.message}>
              <Input className="h-10" {...register("territory")} />
            </FormField>
            <FormField id="duration" label="Durée des droits" error={formState.errors.duration?.message}>
              <Input className="h-10" {...register("duration")} />
            </FormField>
          </div>
          <FormField id="assignmentPrice" label="Rémunération" error={formState.errors.assignmentPrice?.message}>
            <Input className="h-10" {...register("assignmentPrice")} placeholder="3 000 € forfait" />
          </FormField>
          <FormField id="paymentTerms" label="Modalités de paiement" error={formState.errors.paymentTerms?.message}>
            <TextArea id="paymentTerms" {...register("paymentTerms")} />
          </FormField>
        </>
      )}
      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ReviewBlock title="Cession">
            <p>Œuvre : {values.workTitle}</p>
            <p>Cessionnaire : {values.clientName}</p>
            <p className="font-medium">{values.assignmentPrice}</p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
