import { ProfessionalAdviceBanner } from "@/components/legal/professional-advice-banner";
import { getDocumentAudit } from "@/lib/legal/document-audit";
import type { DocumentSlug } from "@/lib/documents/registry";

export function DocumentLegalNotice({ documentSlug }: { documentSlug: DocumentSlug }) {
  const audit = getDocumentAudit(documentSlug);
  if (!audit) return null;

  return (
    <div className="mt-8 space-y-4">
      <ProfessionalAdviceBanner slug={documentSlug} />

      <aside className="rounded-lg border border-blue-200/60 bg-blue-50/40 p-5 text-sm dark:border-blue-900/50 dark:bg-blue-950/20">
        <p className="font-semibold text-foreground">
          Conformité juridique — {audit.title}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Modèle structuré aligné sur le droit français. Les points ci-dessous résument les
          contrôles à effectuer avant publication.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
          {audit.statusChecks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {audit.limitations.length > 0 && (
          <>
            <p className="mt-3 text-xs font-medium text-amber-800 dark:text-amber-200">
              Limites du modèle
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {audit.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}
