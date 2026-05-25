import type { ReactNode } from "react";

export default function GenerateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {children}
    </div>
  );
}
