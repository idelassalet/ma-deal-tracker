"use client";

import { useMemo, useState } from "react";
import {
  filterDeals,
  formatPct,
  formatUsdB,
  summarise,
  valueBySector,
  valueByYear,
} from "@/lib/deals";
import { DealCard } from "./DealCard";
import { DealTable } from "./DealTable";
import { DealValueChart } from "./DealValueChart";
import { FilterBar, initialFilters, type FilterState } from "./FilterBar";
import { KpiTile } from "./KpiTile";
import { SectorBreakdownChart } from "./SectorBreakdownChart";

/**
 * Owns the filter state for the dashboard. Filters drive the KPI tiles and both
 * charts as well as the list, so the whole view always describes one cohort.
 */
export function DealExplorer() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const visible = useMemo(() => filterDeals(filters), [filters]);
  const stats = useMemo(() => summarise(visible), [visible]);
  const byYear = useMemo(() => valueByYear(visible), [visible]);
  const bySector = useMemo(() => valueBySector(visible), [visible]);

  return (
    <div className="space-y-6">
      <FilterBar
        value={filters}
        onChange={setFilters}
        onReset={() => setFilters(initialFilters)}
        resultCount={visible.length}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile
          hero
          label="Combined deal value"
          value={formatUsdB(stats.totalValueUsdB)}
          footnote={`${stats.count} ${stats.count === 1 ? "transaction" : "transactions"} in view`}
        />
        <KpiTile
          label="Median premium paid"
          value={formatPct(stats.medianPremiumPct)}
          footnote="over the target's unaffected share price"
        />
        <KpiTile
          label="Completion rate"
          value={formatPct(stats.completionRatePct)}
          footnote={
            stats.terminated === 0
              ? "no abandoned deals in view"
              : `${stats.terminated} abandoned after announcement`
          }
        />
        <KpiTile
          label="Largest single deal"
          value={
            visible.length === 0
              ? "—"
              : formatUsdB(Math.max(...visible.map((d) => d.valueUsdB)))
          }
          footnote={
            visible.length === 0
              ? "no deals match the filters"
              : [...visible].sort((a, b) => b.valueUsdB - a.valueUsdB)[0].target
          }
        />
      </div>

      {visible.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          <DealValueChart data={byYear} />
          <SectorBreakdownChart data={bySector} />
        </div>
      )}

      {visible.length === 0 ? (
        <div className="rounded-xl border border-hairline bg-surface p-10 text-center">
          <p className="font-medium">No deals match these filters.</p>
          <p className="mt-1 text-sm text-ink-secondary">
            Try widening the sector, status or year.
          </p>
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="mt-4 rounded-md border border-hairline bg-surface-raised px-3 py-1.5 text-sm hover:bg-plane"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-3 lg:hidden">
            {visible.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </ul>
          <div className="hidden lg:block">
            <DealTable deals={visible} />
          </div>
        </>
      )}
    </div>
  );
}
