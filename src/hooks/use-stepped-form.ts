"use client";

import { useEffect, useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ZodType } from "zod";

import { scrollToFirstFormError } from "@/components/forms/form-error-summary";
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
  const [generateSuccess, setGenerateSuccess] = useState(false);
  const [stepErrorCount, setStepErrorCount] = useState(0);
  const currentStep = steps[stepIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

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
      setStepErrorCount(result.error.issues.length);
      requestAnimationFrame(() => scrollToFirstFormError());
      return false;
    }

    if (stepId === "company") {
      const companyError = validateCompanyLegalFields(
        form.getValues() as Record<string, unknown>,
      );
      if (companyError) {
        form.setError("shareCapital" as Path<T>, { message: companyError });
        setStepErrorCount(1);
        requestAnimationFrame(() => scrollToFirstFormError());
        return false;
      }
    }

    setStepErrorCount(0);
    return true;
  }

  async function goNext() {
    const valid = await validateStep(currentStep.id);
    if (!valid) return;
    setGenerateSuccess(false);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function goBack() {
    setStepErrorCount(0);
    setGenerateSuccess(false);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function goToStep(index: number) {
    setStepErrorCount(0);
    setGenerateSuccess(false);
    setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  }

  async function handleGenerate(onGenerate: () => Promise<void>) {
    const valid = await form.trigger();
    if (!valid) {
      setStepErrorCount(Object.keys(form.formState.errors).length);
      requestAnimationFrame(() => scrollToFirstFormError());
      return;
    }

    setIsGenerating(true);
    setGenerateError(null);
    setGenerateSuccess(false);
    try {
      await onGenerate();
      setGenerateSuccess(true);
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
    generateSuccess,
    stepErrorCount,
    goNext,
    goBack,
    goToStep,
    handleGenerate,
  };
}
