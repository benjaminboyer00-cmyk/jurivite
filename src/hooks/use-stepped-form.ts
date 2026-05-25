"use client";

import { useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ZodType } from "zod";

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

  async function handleGenerate(message: string) {
    const valid = await form.trigger();
    if (!valid) return;

    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert(message);
    } finally {
      setIsGenerating(false);
    }
  }

  return {
    stepIndex,
    currentStep,
    isGenerating,
    goNext,
    goBack,
    handleGenerate,
  };
}
