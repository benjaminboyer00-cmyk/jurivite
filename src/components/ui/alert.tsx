import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "flex gap-3 rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/50 text-foreground",
        info: "border-primary/20 bg-primary/5 text-foreground",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100",
        warning:
          "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  destructive: AlertCircle,
} as const;

export function Alert({
  className,
  variant = "default",
  title,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    title?: string;
  }) {
  const Icon = icons[variant ?? "default"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">
        {title ? <p className="font-medium">{title}</p> : null}
        <div className={title ? "mt-1 text-[0.925em] opacity-90" : ""}>
          {children}
        </div>
      </div>
    </div>
  );
}
