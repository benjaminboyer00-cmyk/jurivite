import { Clock, FileDown, Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { DocumentDefinition } from "@/lib/documents/registry";

type GeneratePageMetaProps = {
  doc: DocumentDefinition;
  stepCount?: number;
};

export function GeneratePageMeta({ doc, stepCount }: GeneratePageMetaProps) {
  return (
    <ul className="flex flex-wrap gap-2 pt-1" aria-label="Informations sur le générateur">
      <li>
        <Badge variant="secondary" className="gap-1.5 font-normal">
          <Clock className="size-3.5" aria-hidden />~{doc.estimatedMinutes} min
        </Badge>
      </li>
      {stepCount ? (
        <li>
          <Badge variant="secondary" className="gap-1.5 font-normal">
            <Layers className="size-3.5" aria-hidden />
            {stepCount} étapes
          </Badge>
        </li>
      ) : null}
      <li>
        <Badge variant="secondary" className="gap-1.5 font-normal">
          <FileDown className="size-3.5" aria-hidden />
          PDF instantané
        </Badge>
      </li>
      <li>
        <Badge className="gap-1.5 bg-emerald-600/10 font-normal text-emerald-800 dark:text-emerald-200">
          Gratuit (filigrane)
        </Badge>
      </li>
    </ul>
  );
}
