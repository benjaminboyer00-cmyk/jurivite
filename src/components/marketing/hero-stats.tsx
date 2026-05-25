const stats = [
  { value: "5", label: "Documents juridiques" },
  { value: "5 min", label: "Temps moyen" },
  { value: "0 €", label: "Pour commencer" },
] as const;

export function HeroStats() {
  return (
    <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border/60 pt-10 sm:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
