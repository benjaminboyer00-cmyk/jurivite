import { Clock, FileText } from "lucide-react";

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

type DocumentCardProps = {
  document: DocumentDefinition;
};

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <FileText className="size-5 text-primary" aria-hidden />
          <Badge variant="secondary">
            ~{document.estimatedMinutes} min
          </Badge>
        </div>
        <CardTitle className="text-lg">{document.title}</CardTitle>
        <CardDescription>{document.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" aria-hidden />
          Formulaire guidé, export PDF
        </p>
      </CardContent>
      <CardFooter>
        <ButtonLink href={document.href} className="w-full">
          Générer gratuitement
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
