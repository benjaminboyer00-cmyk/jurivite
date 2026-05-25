import type { ReactNode } from "react";

export default function GenerateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-container max-w-3xl py-8 sm:py-12">
      {children}
    </div>
  );
}
