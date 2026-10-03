"use client";

import { useState } from "react";
import { formatUsdB, type Sector } from "@/lib/deals";

type Row = { sector: Sector; valueUsdB: number; count: number };

/**
 * Deal value by sector — the second magnitude context on the dashboard, so it
 * takes the second sequential hue. Values sit outside the bar end, which is
 * always legible regardless of bar length.
 */
export function SectorBreakdownChart({ data }: { data: Row[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const max = Math.max(...data.map((d) => d.valueUsdB), 0);

  return (
    <figure className="rounded-xl border border-hairline bg-surface p-4">
      <figcaption className="mb-1 text-sm font-medium">
        Deal value by sector
      </figcaption>
      <p className="mb-5 text-xs text-ink-secondary">
        USD billions, summed across the tracked deals.
      </p>

      {data.length === 0 ? (
        <p className="py-6 text-center text-sm text-ink-muted">
          No deals match the current filters.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {data.map((row) => {
            const pct = max === 0 ? 0 : Math.round((row.valueUsdB / max) * 10000) / 100;
            return (
              <li
                key={row.sector}
                className="grid grid-cols-[minmax(6.5rem,8.5rem)_1fr] items-center gap-3"
                onMouseEnter={() => setHovered(row.sector)}
                onMouseLeave={() => setHovered(null)}
                title={`${row.count} ${row.count === 1 ? "deal" : "deals"}`}
              >
                <span className="truncate text-xs text-ink-secondary">
                  {row.sector}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-3.5 rounded-r"
                    style={{
                      width: `${Math.max(pct, 1)}%`,
                      backgroundColor: "var(--series-2)",
                      opacity: hovered === null || hovered === row.sector ? 1 : 0.55,
                    }}
                  />
                  <span className="shrink-0 text-xs text-ink-secondary tabular-nums">
                    {formatUsdB(row.valueUsdB)}
                    <span className="text-ink-muted">
                      {" "}· {row.count}
                    </span>
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </figure>
  );
}
