import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { LEGAL_MODEL_DISCLAIMER } from "@/lib/legal/disclaimers";

export function LegalDisclaimerBanner() {
  return (
    <Alert variant="info" title="Information importante">
      {LEGAL_MODEL_DISCLAIMER}{" "}
      <Link href="/cgu" className="font-medium text-primary underline-offset-4 hover:underline">
        CGU du service
      </Link>
      .
    </Alert>
  );
}

/** Case à cocher obligatoire avant téléchargement PDF */
export function LegalAcceptanceCheckbox({
  checked,
  onChange,
  id = "legal-accept",
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  id?: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer gap-3 rounded-lg border border-amber-200/80 bg-amber-50/50 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 rounded border-input"
      />
      <span>
        Je confirme avoir relu mes informations et comprendre que ce PDF est un{" "}
        <strong>modèle</strong>, non un avis juridique (relecture CGV B2C / RGPD recommandée
        selon mon activité). J&apos;accepte les{" "}
        <Link href="/cgu" className="text-primary underline" target="_blank">
          CGU
        </Link>{" "}
        pour l&apos;usage du générateur.
      </span>
    </label>
  );
}
