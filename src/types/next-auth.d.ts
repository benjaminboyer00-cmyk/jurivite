import type { Plan } from "@/lib/plans";

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: Plan;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    plan?: Plan;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    plan?: Plan;
  }
}
