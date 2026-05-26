import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import {
  DISCLAIMER_FULL_TEXT,
  LEGAL_ACCEPTANCE_TEXT,
  LEGAL_MODEL_DISCLAIMER,
  SERVICE_DISCLAIMER,
} from "@/lib/legal/jurivite-site";

export function LegalDisclaimerBanner() {
  return (
    <Alert variant="info" title="Avertissement important">
      <p className="leading-relaxed">{SERVICE_DISCLAIMER}</p>
      <p className="mt-2 text-sm leading-relaxed">{LEGAL_MODEL_DISCLAIMER}</p>
      <p className="mt-3 text-sm">
        <Link href="/avis-juridique" className="font-medium text-primary underline">
          Avis juridique complet
        </Link>
        {" · "}
        <Link href="/confidentialite" className="font-medium text-primary underline">
          Politique de confidentialité
        </Link>
        {" · "}
        <Link href="/cgu" className="font-medium text-primary underline">
          CGU
        </Link>
      </p>
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
    <div className="space-y-3 rounded-lg border border-amber-300/80 bg-amber-50/60 p-4 dark:border-amber-800 dark:bg-amber-950/30">
      <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
        Avertissement important
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {DISCLAIMER_FULL_TEXT}
      </p>
      <label
        htmlFor={id}
        className="flex cursor-pointer gap-3 text-sm leading-relaxed"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 rounded border-input"
          required
        />
        <span>
          {LEGAL_ACCEPTANCE_TEXT}{" "}
          <Link href="/avis-juridique" className="text-primary underline" target="_blank">
            (détail)
          </Link>
          {" · "}
          <Link href="/cgu" className="text-primary underline" target="_blank">
            CGU
          </Link>
        </span>
      </label>
    </div>
  );
}
