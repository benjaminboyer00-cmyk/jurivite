"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type SeoBlock = { heading: string; body: string };
type Faq = { question: string; answer: string };
type RelatedLink = { href: string; title: string };

type GenerateSeoSectionProps = {
  docTitle: string;
  seoBlocks: SeoBlock[];
  faqs: Faq[];
  relatedLinks: RelatedLink[];
};

export function GenerateSeoSection({
  docTitle,
  seoBlocks,
  faqs,
  relatedLinks,
}: GenerateSeoSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="mt-12 border-t pt-8">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:pointer-events-none sm:cursor-default sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2 font-semibold">
          <BookOpen className="size-4 text-primary sm:hidden" aria-hidden />
          Guide & FAQ — {docTitle}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform sm:hidden",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "mt-6 space-y-12",
          !open && "hidden sm:block",
        )}
      >
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Guide complet — {docTitle}
          </h2>
          <div className="mt-8 space-y-8">
            {seoBlocks.map((block) => (
              <section key={block.heading}>
                <h3 className="text-xl font-semibold tracking-tight">
                  {block.heading}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {block.body}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Questions fréquentes
          </h2>
          <dl className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border bg-card px-5 py-4 shadow-sm"
              >
                <dt className="font-semibold">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6">
          <h2 className="font-semibold">Documents associés</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
