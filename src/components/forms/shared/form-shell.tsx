"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, FileDown, Loader2 } from "lucide-react";

import { OneShotCheckoutButton } from "@/components/auth/one-shot-checkout-button";
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
import { isDocumentSlug } from "@/lib/documents/registry";
import { formatPriceEur, PRICING } from "@/lib/plans";
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
    <div className="space-y-6 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <StepIndicator steps={steps} currentIndex={stepIndex} />

      <Card className="overflow-hidden border-border/80 shadow-sm">
        <CardHeader className="border-b bg-muted/30 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">{currentStep.title}</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {currentStep.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-4 pt-6 sm:px-6">
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

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 pt-3 backdrop-blur-md safe-bottom sm:static sm:z-auto sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none",
        )}
      >
        <div className="mx-auto flex max-w-3xl flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={stepIndex === 0 || isGenerating}
            className="h-11 w-full sm:h-9 sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            Retour
          </Button>

          {!isReview ? (
            <Button
              type="button"
              onClick={onNext}
              disabled={isGenerating}
              className="h-11 w-full sm:h-9 sm:w-auto"
            >
              Continuer
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onGenerate}
              disabled={isGenerating || !legalAccepted}
              className="h-11 w-full sm:h-10 sm:w-auto"
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
  const pathname = usePathname();
  const slugMatch = pathname?.match(/\/generate\/([^/]+)/);
  const slug =
    slugMatch?.[1] && isDocumentSlug(slugMatch[1]) ? slugMatch[1] : undefined;

  return (
    <Alert variant="warning" title="Version gratuite">
      <p>
        PDF avec filigrane. Débloquez sans filigrane et mises à jour à vie sur ce
        document :{" "}
        <strong>{formatPriceEur(PRICING.singleDoc)}</strong> — ou{" "}
        <Link href="/tarifs" className="font-medium text-primary underline">
          voir toutes les offres
        </Link>
        .
      </p>
      {slug ? (
        <div className="mt-4">
          <OneShotCheckoutButton
            product="single_doc"
            slug={slug}
            label={`Débloquer ce document — ${formatPriceEur(PRICING.singleDoc)}`}
          />
        </div>
      ) : null}
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
