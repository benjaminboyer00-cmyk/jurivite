import { Badge } from "@/components/ui/badge";
import type { SignatureWorkspaceStatus } from "@/lib/signing/workspace";

const config: Record<
  SignatureWorkspaceStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  draft: { label: "À envoyer", variant: "secondary" },
  pending: { label: "En attente", variant: "outline" },
  signed: { label: "Signé", variant: "default" },
  expired: { label: "Expiré", variant: "destructive" },
  cancelled: { label: "Remplacé", variant: "outline" },
};

export function SignatureStatusBadge({
  status,
}: {
  status: SignatureWorkspaceStatus;
}) {
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}
