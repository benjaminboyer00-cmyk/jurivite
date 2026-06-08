"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileDown,
  Loader2,
  Pencil,
  RotateCcw,
} from "lucide-react";

import { OneShotCheckoutButton } from "@/components/auth/one-shot-checkout-button";
import {
  FormErrorSummary,
  scrollToFirstFormError,
} from "@/components/forms/form-error-summary";
import { StepIndicator } from "@/components/forms/step-indicator";
import { LegalAcceptanceCheckbox } from "@/components/legal/legal-disclaimer";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
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
  generateSuccess?: boolean;
  stepErrorCount?: number;
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
  generateSuccess = false,
  stepErrorCount = 0,
  children,
}: FormShellProps) {
  const currentStep = steps[stepIndex];
  const isReview = currentStep.id === "review";
  const [legalAccepted, setLegalAccepted] = useState(false);
  const progressValue = Math.round(((stepIndex + 1) / steps.length) * 100);

  return (
    <div className="space-y-5 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <div className="space-y-3">
        <StepIndicator steps={steps} currentIndex={stepIndex} />
        <Progress value={progressValue} aria-label="Progression du formulaire">
          <ProgressTrack className="h-1.5">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>

      {generateSuccess ? (
        <Alert variant="success" title="PDF téléchargé">
          <p>
            Votre document a été généré. Vérifiez votre dossier Téléchargements.
            Vous pouvez régénérer une version mise à jour ou débloquer le PDF sans
            filigrane.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onGenerate}
              disabled={isGenerating || !legalAccepted}
            >
              <RotateCcw className="size-3.5" />
              Régénérer
            </Button>
            <ButtonLink href="/dashboard" variant="ghost" size="sm">
              Mon tableau de bord
            </ButtonLink>
          </div>
        </Alert>
      ) : null}

      <FormErrorSummary
        count={stepErrorCount}
        onScrollToFirst={scrollToFirstFormError}
      />

      <Card className="overflow-hidden border-border/80 shadow-sm">
        <CardHeader className="border-b bg-muted/30 px-4 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-lg sm:text-xl">{currentStep.title}</CardTitle>
              <CardDescription className="mt-1 text-sm sm:text-base">
                {currentStep.description}
              </CardDescription>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {stepIndex + 1}/{steps.length}
            </span>
          </div>
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
        <Alert variant="destructive" title="Échec de la génération">
          <p>{generateError}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={onGenerate}
            disabled={isGenerating || !legalAccepted}
          >
            <RotateCcw className="size-3.5" />
            Réessayer
          </Button>
        </Alert>
      ) : null}

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 pt-3 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md safe-bottom sm:static sm:z-auto sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none",
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
              ) : generateSuccess ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <FileDown className="size-4" />
              )}
              {isGenerating
                ? "Génération… (10–30 s)"
                : generateSuccess
                  ? "Télécharger à nouveau"
                  : "Télécharger le PDF"}
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
  onEdit,
  children,
}: {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
        {onEdit ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 gap-1.5 px-2 text-xs"
            onClick={onEdit}
          >
            <Pencil className="size-3" aria-hidden />
            Modifier
          </Button>
        ) : null}
      </div>
      <div className="mt-3 space-y-1.5 text-sm">{children}</div>
    </div>
  );
}
