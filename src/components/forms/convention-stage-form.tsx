"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CompanyFields } from "@/components/forms/fields/company-fields";
import { FormField, TextArea } from "@/components/forms/fields/form-field";
import { ProfessionalAdviceBanner } from "@/components/legal/professional-advice-banner";
import { FormShell, ReviewBlock, WatermarkNotice } from "@/components/forms/shared/form-shell";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useDocumentGenerate } from "@/components/forms/use-document-generate";
import { useSteppedForm } from "@/hooks/use-stepped-form";
import { companyDefaultValues, companySchema } from "@/lib/schemas/company";
import {
  CONVENTION_STAGE_STEPS,
  stageDetailsSchema,
  conventionStageFormSchema,
  type ConventionStageFormValues,
} from "@/lib/schemas/convention-stage";

const defaultValues: ConventionStageFormValues = {
  ...companyDefaultValues,
  traineeName: "",
  traineeAddress: "",
  schoolName: "",
  schoolAddress: "",
  schoolRepresentative: "",
  tutorName: "",
  startDate: "",
  endDate: "",
  weeklyHours: 35,
  missionDescription: "",
  gratificationAmount: "",
};

export function ConventionStageForm() {
  const form = useForm<ConventionStageFormValues>({
    resolver: zodResolver(conventionStageFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const generatePdf = useDocumentGenerate("convention-stage");
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
      steps: CONVENTION_STAGE_STEPS,
      stepSchemas: { company: companySchema, stage: stageDetailsSchema },
    });

  const values = form.watch();
  const { register, formState } = form;

  return (
    <FormShell
      steps={CONVENTION_STAGE_STEPS}
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
      {currentStep.id === "stage" && (
        <>
          <Alert variant="warning" title="Convention officielle obligatoire">
            Ce document est une base de travail. La convention tripartite signée par
            l&apos;établissement (Cerfa / modèle de l&apos;école) est seule opposable.
          </Alert>
          <FormField id="tutorName" label="Nom du tuteur de stage" error={formState.errors.tutorName?.message}>
            <Input className="h-10" {...register("tutorName")} />
          </FormField>
          <FormField id="traineeName" label="Nom du stagiaire" error={formState.errors.traineeName?.message}>
            <Input className="h-10" {...register("traineeName")} />
          </FormField>
          <FormField id="traineeAddress" label="Adresse du stagiaire" error={formState.errors.traineeAddress?.message}>
            <Input className="h-10" {...register("traineeAddress")} />
          </FormField>
          <FormField id="schoolName" label="Établissement d'enseignement *" error={formState.errors.schoolName?.message}>
            <Input className="h-10" {...register("schoolName")} placeholder="Université / lycée / école" />
          </FormField>
          <FormField id="schoolAddress" label="Adresse de l'établissement *" error={formState.errors.schoolAddress?.message}>
            <Input className="h-10" {...register("schoolAddress")} />
          </FormField>
          <FormField
            id="schoolRepresentative"
            label="Représentant de l'établissement *"
            hint="Directeur, responsable des stages — signataire de la convention Cerfa"
            error={formState.errors.schoolRepresentative?.message}
          >
            <Input className="h-10" {...register("schoolRepresentative")} placeholder="Mme Dupont, Proviseur" />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="startDate" label="Date de début" error={formState.errors.startDate?.message}>
              <Input className="h-10" type="date" {...register("startDate")} />
            </FormField>
            <FormField id="endDate" label="Date de fin" error={formState.errors.endDate?.message}>
              <Input className="h-10" type="date" {...register("endDate")} />
            </FormField>
          </div>
          <FormField id="weeklyHours" label="Heures par semaine" error={formState.errors.weeklyHours?.message}>
            <Input className="h-10" type="number" min={1} max={40} {...register("weeklyHours", { valueAsNumber: true })} />
          </FormField>
          <FormField id="missionDescription" label="Mission" error={formState.errors.missionDescription?.message}>
            <TextArea id="missionDescription" {...register("missionDescription")} />
          </FormField>
          <FormField
            id="gratificationAmount"
            label="Gratification (optionnel)"
            hint="Obligatoire si le stage dure plus de 2 mois consécutifs."
            error={formState.errors.gratificationAmount?.message}
          >
            <Input className="h-10" {...register("gratificationAmount")} placeholder="600 € / mois" />
          </FormField>
        </>
      )}
      {currentStep.id === "review" && (
        <div className="space-y-4">
          <ProfessionalAdviceBanner slug="convention-stage" />
          <ReviewBlock title="Stage">
            <p>{values.traineeName} — {values.schoolName}</p>
            <p>{values.startDate} → {values.endDate}</p>
            <p>Tuteur : {values.tutorName}</p>
          </ReviewBlock>
          <WatermarkNotice />
        </div>
      )}
    </FormShell>
  );
}
