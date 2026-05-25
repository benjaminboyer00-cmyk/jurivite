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
  CGU_STEPS,
  cguDetailsSchema,
  conditionsUtilisationFormSchema,
  type ConditionsUtilisationFormValues,
} from "@/lib/schemas/conditions-utilisation";

const defaultValues: ConditionsUtilisationFormValues = {
  ...companyDefaultValues,
  websiteUrl: "https://",
  siteName: "",
  serviceDescription: "",
  liabilityClause:
    "Le service est fourni « en l'état ». L'Éditeur ne garantit pas une disponibilité ininterrompue et décline toute responsabilité pour les dommages indirects. La responsabilité cumulée de l'Éditeur est limitée aux sommes versées par l'utilisateur au cours des douze (12) derniers mois.",
  applicableLaw: "français",
};

export function ConditionsUtilisationForm() {
  const form = useForm<ConditionsUtilisationFormValues>({
    resolver: zodResolver(conditionsUtilisationFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("conditions-utilisation");
  const { stepIndex, currentStep, isGenerating, generateError, goNext, goBack, handleGenerate } =
    useSteppedForm({
      form,
      steps: CGU_STEPS,
      stepSchemas: { company: companySchema, service: cguDetailsSchema },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={CGU_STEPS}
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
      {currentStep.id === "service" && (
        <>
          <FormField id="siteName" label="Nom du service / application" error={formState.errors.siteName?.message}>
            <Input className="h-10" {...register("siteName")} />
          </FormField>
          <FormField id="websiteUrl" label="URL du service" error={formState.errors.websiteUrl?.message}>
            <Input className="h-10" type="url" {...register("websiteUrl")} />
          </FormField>
          <FormField id="serviceDescription" label="Description du service" error={formState.errors.serviceDescription?.message}>
            <TextArea id="serviceDescription" {...register("serviceDescription")} />
          </FormField>
          <FormField id="liabilityClause" label="Clause de responsabilité" error={formState.errors.liabilityClause?.message}>
            <TextArea id="liabilityClause" {...register("liabilityClause")} />
          </FormField>
          <FormField id="applicableLaw" label="Droit applicable" error={formState.errors.applicableLaw?.message}>
            <Input className="h-10" {...register("applicableLaw")} />
          </FormField>
        </>
      )}
      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ReviewBlock title="CGU">
            <p>{values.siteName}</p>
            <p className="text-muted-foreground">{values.websiteUrl}</p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
