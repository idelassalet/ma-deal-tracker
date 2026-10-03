"use client";

import { useState } from "react";
import { formatUsdB } from "@/lib/deals";
import { niceScale } from "@/lib/scale";

type Point = { year: number; valueUsdB: number; count: number };

const PLOT_HEIGHT = 220;

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Announced deal value per year. One series, so no legend — the title names
 * what is plotted. The largest column is direct-labelled; the rest are carried
 * by the axis ticks and the hover tooltip.
 */
export function DealValueChart({ data }: { data: Point[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { max, ticks } = niceScale(Math.max(...data.map((d) => d.valueUsdB), 0));
  const peak = data.reduce((a, b) => (b.valueUsdB > a.valueUsdB ? b : a), data[0]);

  if (data.length === 0) return null;

  return (
    <figure className="rounded-xl border border-hairline bg-surface p-4">
      <figcaption className="mb-1 text-sm font-medium">
        Announced deal value by year
      </figcaption>
      <p className="mb-5 text-xs text-ink-secondary">
        USD billions, summed by announcement year across the tracked deals.
      </p>

      <div className="flex gap-3">
        {/* y-axis ticks, top-down */}
        <div
          className="relative w-10 shrink-0 text-right"
          style={{ height: PLOT_HEIGHT }}
          aria-hidden
        >
          {[...ticks].reverse().map((tick) => (
            <span
              key={tick}
              className="absolute right-0 -translate-y-1/2 text-[10px] text-ink-muted tabular-nums"
              style={{ top: `${round((1 - tick / max) * 100)}%` }}
            >
              {tick}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          {/* gridlines */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{ height: PLOT_HEIGHT }}
            aria-hidden
          >
            {ticks.map((tick) => (
              <div
                key={tick}
                className="absolute inset-x-0 h-px"
                style={{
                  top: `${round((1 - tick / max) * 100)}%`,
                  backgroundColor:
                    tick === 0 ? "var(--baseline)" : "var(--gridline)",
                }}
              />
            ))}
          </div>

          <div className="flex items-end gap-1" style={{ height: PLOT_HEIGHT }}>
            {data.map((point, i) => {
              const pct = max === 0 ? 0 : round((point.valueUsdB / max) * 100);
              const isPeak = point.year === peak.year && point.valueUsdB > 0;
              return (
                <div
                  key={point.year}
                  className="group relative flex h-full flex-1 items-end justify-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  aria-label={`${point.year}: ${formatUsdB(point.valueUsdB)} across ${point.count} deals`}
                >
                  {isPeak && (
                    <span className="absolute left-1/2 -translate-x-1/2 text-[10px] font-medium text-ink-secondary tabular-nums"
                      style={{ bottom: `calc(${pct}% + 4px)` }}>
                      {formatUsdB(point.valueUsdB)}
                    </span>
                  )}
                  <div
                    className="w-full max-w-[24px] rounded-t"
                    style={{
                      height: `${pct}%`,
                      minHeight: point.valueUsdB > 0 ? 2 : 0,
                      backgroundColor: "var(--series-1)",
                      opacity: hovered === null || hovered === i ? 1 : 0.55,
                    }}
                  />
                  {hovered === i && (
                    <div className="pointer-events-none absolute bottom-full z-10 mb-2 w-max -translate-x-0 rounded-lg border border-hairline bg-surface-raised px-2.5 py-1.5 text-xs shadow-lg">
                      <p className="font-medium tabular-nums">{point.year}</p>
                      <p className="text-ink-secondary tabular-nums">
                        {formatUsdB(point.valueUsdB)} · {point.count}{" "}
                        {point.count === 1 ? "deal" : "deals"}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex gap-1">
            {data.map((point) => (
              <span
                key={point.year}
                className="flex-1 text-center text-[10px] text-ink-muted tabular-nums"
              >
                {`'${String(point.year).slice(2)}`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
