"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, FileDown, Loader2 } from "lucide-react";

import { LegalAcceptanceCheckbox } from "@/components/legal/legal-disclaimer";

import { StepIndicator } from "@/components/forms/step-indicator";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  generateError?: string | null;
  children: React.ReactNode;
};

export function FormShell({
  steps,
  stepIndex,
  onBack,
  onNext,
  onGenerate,
  isGenerating,
  generateError,
  children,
}: FormShellProps) {
  const currentStep = steps[stepIndex];
  const isReview = currentStep.id === "review";
  const [legalAccepted, setLegalAccepted] = useState(false);

  return (
    <div className="space-y-6 pb-24 sm:pb-0">
      <StepIndicator steps={steps} currentIndex={stepIndex} />

      <Card className="overflow-hidden border-border/80 shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-xl">{currentStep.title}</CardTitle>
          <CardDescription className="text-base">
            {currentStep.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          {children}
          {isReview ? (
            <LegalAcceptanceCheckbox
              checked={legalAccepted}
              onChange={setLegalAccepted}
            />
          ) : null}
        </CardContent>
      </Card>

      {generateError ? (
        <Alert variant="destructive" title="Erreur">
          {generateError}
        </Alert>
      ) : null}

      {/* Barre d'actions sticky sur mobile */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-4 backdrop-blur-md sm:static sm:z-auto sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none",
        )}
      >
        <div className="mx-auto flex max-w-3xl flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={stepIndex === 0 || isGenerating}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            Retour
          </Button>

          {!isReview ? (
            <Button
              type="button"
              onClick={onNext}
              disabled={isGenerating}
              className="w-full sm:w-auto"
            >
              Continuer
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onGenerate}
              disabled={isGenerating || !legalAccepted}
              className="w-full sm:w-auto"
              size="lg"
            >
              {isGenerating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileDown className="size-4" />
              )}
              {isGenerating ? "Génération en cours…" : "Télécharger le PDF"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function WatermarkNotice() {
  return (
    <Alert variant="warning" title="Version gratuite">
      PDF avec filigrane JuriVite.{" "}
      <Link href="/tarifs" className="font-medium text-primary underline-offset-4 hover:underline">
        Pro 9 €/mo
      </Link>{" "}
      (20 PDF sans filigrane) ou{" "}
      <Link href="/tarifs" className="font-medium text-primary underline-offset-4 hover:underline">
        Business 30 €/mo
      </Link>{" "}
      (illimité + API).
    </Alert>
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
    <div className="rounded-lg border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="mt-3 space-y-1.5 text-sm">{children}</div>
    </div>
  );
}
