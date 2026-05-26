const stats = [
  { value: "10", label: "Documents juridiques" },
  { value: "5 min", label: "Temps moyen" },
  { value: "0 €", label: "Pour commencer" },
] as const;

export function HeroStats() {
  return (
    <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-border/60 pt-8 sm:mt-12 sm:gap-8 sm:pt-10">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-0 text-center sm:text-left">
          <dt className="text-[0.65rem] font-medium uppercase leading-tight tracking-wider text-muted-foreground min-[400px]:text-xs">
            {stat.label}
          </dt>
          <dd className="mt-1 text-xl font-bold tracking-tight text-primary sm:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
