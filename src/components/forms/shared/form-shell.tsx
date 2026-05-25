"use client";

import { ArrowLeft, ArrowRight, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type FormStep = {
  id: string;
  title: string;
  description: string;
};

type FormShellProps = {
  steps: readonly FormStep[];
  stepIndex: number;
  onBack: () => void;
  onNext: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  children: React.ReactNode;
};

export function FormShell({
  steps,
  stepIndex,
  onBack,
  onNext,
  onGenerate,
  isGenerating,
  children,
}: FormShellProps) {
  const currentStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const isReview = currentStep.id === "review";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Étape {stepIndex + 1} sur {steps.length}
          </span>
          <span>{Math.round(progress)} %</span>
        </div>
        <Progress value={progress} aria-label="Progression du formulaire" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={stepIndex === 0}
        >
          <ArrowLeft className="size-4" />
          Retour
        </Button>

        {!isReview ? (
          <Button type="button" onClick={onNext}>
            Continuer
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            <FileDown className="size-4" />
            {isGenerating ? "Génération…" : "Générer le PDF"}
          </Button>
        )}
      </div>
    </div>
  );
}

export function WatermarkNotice() {
  return (
    <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      Version gratuite : le PDF inclura un filigrane JuriVite. Passez Pro pour
      un document sans filigrane.
    </p>
  );
}

export function ReviewBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-medium">{title}</h3>
      <div className="mt-2 space-y-1 text-sm">{children}</div>
    </div>
  );
}
