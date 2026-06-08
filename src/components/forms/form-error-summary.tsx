import { Alert } from "@/components/ui/alert";

export function FormErrorSummary({
  count,
  onScrollToFirst,
}: {
  count: number;
  onScrollToFirst?: () => void;
}) {
  if (count <= 0) return null;

  return (
    <Alert variant="destructive" title="Corrigez les champs en rouge">
      <p>
        {count} champ{count > 1 ? "s" : ""} à compléter ou corriger avant de
        continuer.
        {onScrollToFirst ? (
          <>
            {" "}
            <button
              type="button"
              className="font-medium underline underline-offset-2"
              onClick={onScrollToFirst}
            >
              Aller au premier
            </button>
          </>
        ) : null}
      </p>
    </Alert>
  );
}

export function scrollToFirstFormError() {
  const first =
    document.querySelector<HTMLElement>("[data-field-error='true']") ??
    document.querySelector<HTMLElement>("[aria-invalid='true']");
  first?.scrollIntoView({ behavior: "smooth", block: "center" });
  first?.focus({ preventScroll: true });
}
