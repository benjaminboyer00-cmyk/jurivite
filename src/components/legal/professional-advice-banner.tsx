import { Alert } from "@/components/ui/alert";
import { getDocumentProfessionalAdvice } from "@/lib/legal/professional-advice";
import type { DocumentSlug } from "@/lib/documents/registry";

export function ProfessionalAdviceBanner({ slug }: { slug: DocumentSlug }) {
  const advice = getDocumentProfessionalAdvice(slug);
  if (!advice) return null;

  return (
    <Alert variant="warning" title={advice.title} className="text-sm">
      <p className="leading-relaxed">{advice.summary}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
        {advice.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Alert>
  );
}
