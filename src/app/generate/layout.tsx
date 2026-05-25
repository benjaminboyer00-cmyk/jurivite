import type { ReactNode } from "react";

import { LegalDisclaimerBanner } from "@/components/legal/legal-disclaimer";

export default function GenerateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-container max-w-3xl py-8 sm:py-12">
      <div className="mb-6">
        <LegalDisclaimerBanner />
      </div>
      {children}
    </div>
  );
}
