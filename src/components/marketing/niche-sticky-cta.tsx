"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";

type NicheStickyCtaProps = {
  href: string;
  label: string;
};

export function NicheStickyCta({ href, label }: NicheStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 shadow-lg backdrop-blur sm:hidden">
      <ButtonLink href={href} className="h-11 w-full">
        {label}
      </ButtonLink>
    </div>
  );
}
