import { z } from "zod";

import { documentSlugs } from "@/lib/documents/registry";

const slugTuple = documentSlugs as [
  (typeof documentSlugs)[number],
  ...(typeof documentSlugs)[number][],
];

export const generatePdfBodySchema = z.object({
  slug: z.enum(slugTuple),
  data: z.record(z.string(), z.unknown()).refine(
    (data) => Object.keys(data).length <= 80,
    "Trop de champs dans la requête",
  ),
});
