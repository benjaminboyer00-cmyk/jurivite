import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Step = { id: string; title: string };

export function StepIndicator({
  steps,
  currentIndex,
}: {
  steps: readonly Step[];
  currentIndex: number;
}) {
  const current = steps[currentIndex];

  return (
    <nav aria-label="Étapes du formulaire" className="w-full min-w-0">
      <p className="mb-3 text-center text-sm font-medium sm:hidden">
        Étape {currentIndex + 1} / {steps.length} — {current.title}
      </p>
      <ol className="flex items-center justify-between gap-0.5 overflow-x-auto pb-1 sm:gap-1 sm:overflow-visible sm:pb-0">
        {steps.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step.id}
              className="flex min-w-[2.75rem] flex-1 flex-col items-center gap-1.5 sm:gap-2"
            >
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors",
                      isDone ? "bg-primary" : "bg-border",
                    )}
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold shadow-sm transition-all sm:size-9",
                    isDone &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-primary/10 text-primary",
                    !isDone &&
                      !isCurrent &&
                      "border-muted-foreground/30 text-muted-foreground",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`${step.title}${isCurrent ? " (étape actuelle)" : isDone ? " (terminée)" : ""}`}
                >
                  {isDone ? (
                    <Check className="size-3.5 sm:size-4" aria-hidden />
                  ) : (
                    index + 1
                  )}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors",
                      index < currentIndex ? "bg-primary" : "bg-border",
                    )}
                    aria-hidden
                  />
                )}
              </div>
              <span
                className={cn(
                  "hidden max-w-[5.5rem] truncate text-center text-[0.65rem] font-medium min-[400px]:block sm:max-w-none sm:text-xs",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
