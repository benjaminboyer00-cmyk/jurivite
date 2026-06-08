import Link from "next/link";
import { ArrowRight, Clock, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DocumentDefinition } from "@/lib/documents/registry";
import { cn } from "@/lib/utils";

const priorityStyles: Record<string, string> = {
  cgv: "ring-1 ring-primary/20",
  "contrat-prestation": "ring-1 ring-emerald-500/25",
};

type DocumentCardProps = {
  document: DocumentDefinition;
};

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
        priorityStyles[document.slug],
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
            <FileText className="size-5 text-primary" aria-hidden />
          </span>
          <Badge variant="secondary" className="shrink-0 font-normal">
            ~{document.estimatedMinutes} min
          </Badge>
        </div>
        <div>
          <CardTitle className="text-lg leading-snug">{document.title}</CardTitle>
          <CardDescription className="mt-2 leading-relaxed">
            {document.shortDescription}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4 shrink-0" aria-hidden />
          Formulaire guidé · Export PDF
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">
        <ButtonLink href={document.href} className="w-full">
          Générer gratuitement
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </ButtonLink>
        {document.slug === "cgv" ? (
          <Link
            href="/modeles"
            className="text-center text-xs font-medium text-primary transition-colors hover:underline"
          >
            50 modèles par métier →
          </Link>
        ) : document.slug === "contrat-prestation" ? (
          <Link
            href="/generate/contrat-freelance-norme"
            className="text-center text-xs font-medium text-primary transition-colors hover:underline"
          >
            Contrat freelance norme →
          </Link>
        ) : (
          <Link
            href={document.href}
            className="text-center text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            En savoir plus →
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
