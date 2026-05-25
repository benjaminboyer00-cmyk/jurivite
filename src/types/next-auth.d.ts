import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: "free" | "pro";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    plan?: "free" | "pro";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    plan?: "free" | "pro";
  }
}
