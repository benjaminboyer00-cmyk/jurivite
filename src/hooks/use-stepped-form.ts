"use client";

import { useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ZodType } from "zod";

import { validateCompanyLegalFields } from "@/lib/schemas/company";

type FormStep = { id: string };

export function useSteppedForm<T extends FieldValues>({
  form,
  steps,
  stepSchemas,
}: {
  form: UseFormReturn<T>;
  steps: readonly FormStep[];
  stepSchemas: Record<string, ZodType<Partial<T>>>;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const currentStep = steps[stepIndex];

  async function validateStep(stepId: string): Promise<boolean> {
    const schema = stepSchemas[stepId];
    if (!schema) return true;

    const result = schema.safeParse(form.getValues());
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          form.setError(field as Path<T>, { message: issue.message });
        }
      });
      return false;
    }

    if (stepId === "company") {
      const companyError = validateCompanyLegalFields(
        form.getValues() as Record<string, unknown>,
      );
      if (companyError) {
        form.setError("shareCapital" as Path<T>, { message: companyError });
        return false;
      }
    }

    return true;
  }

  async function goNext() {
    const valid = await validateStep(currentStep.id);
    if (!valid) return;
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleGenerate(onGenerate: () => Promise<void>) {
    const valid = await form.trigger();
    if (!valid) return;

    setIsGenerating(true);
    setGenerateError(null);
    try {
      await onGenerate();
    } catch (error) {
      setGenerateError(
        error instanceof Error
          ? error.message
          : "Erreur lors de la génération",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return {
    stepIndex,
    currentStep,
    isGenerating,
    generateError,
    goNext,
    goBack,
    handleGenerate,
  };
}
