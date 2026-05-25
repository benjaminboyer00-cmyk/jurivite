import { auth } from "@/auth";

import { SiteHeaderNav } from "@/components/layout/site-header-nav";

export async function SiteHeader() {
  const session = await auth();

  return <SiteHeaderNav isLoggedIn={!!session?.user} />;
}
