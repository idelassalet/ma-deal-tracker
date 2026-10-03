import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  /** Short qualifier under the value — what the number is measured against. */
  footnote?: string;
  /** Set on the one headline tile per view. */
  hero?: boolean;
  children?: ReactNode;
};

export function KpiTile({ label, value, footnote, hero = false, children }: Props) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-4">
      <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
        {label}
      </p>
      <p
        className={
          hero
            ? "mt-2 text-5xl font-semibold tracking-tight"
            : "mt-2 text-2xl font-semibold tracking-tight"
        }
      >
        {value}
      </p>
      {footnote && <p className="mt-1 text-xs text-ink-secondary">{footnote}</p>}
      {children}
    </div>
  );
}
