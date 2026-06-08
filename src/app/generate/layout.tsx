import type { ReactNode } from "react";

import { CollapsibleLegalDisclaimer } from "@/components/legal/collapsible-legal-disclaimer";

export default function GenerateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-container max-w-3xl py-6 sm:py-10 md:py-12">
      <div className="mb-5">
        <CollapsibleLegalDisclaimer />
      </div>
      {children}
    </div>
  );
}
