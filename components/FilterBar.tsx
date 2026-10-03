"use client";

import type { ChangeEvent } from "react";
import {
  dealTypes,
  sectors,
  statuses,
  years,
  type DealStatus,
  type DealType,
  type Sector,
  type SortKey,
} from "@/lib/deals";

export type FilterState = {
  sector: Sector | "All";
  dealType: DealType | "All";
  status: DealStatus | "All";
  year: number | "All";
  query: string;
  sort: SortKey;
};

export const initialFilters: FilterState = {
  sector: "All",
  dealType: "All",
  status: "All",
  year: "All",
  query: "",
  sort: "value-desc",
};

const sortLabels: Record<SortKey, string> = {
  "value-desc": "Deal value, high to low",
  "value-asc": "Deal value, low to high",
  recent: "Most recently announced",
  oldest: "Earliest announced",
  "premium-desc": "Premium paid, high to low",
};

const fieldClass =
  "w-full rounded-md border border-hairline bg-surface-raised px-2.5 py-2 text-sm text-ink";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium tracking-wide text-ink-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

type Props = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  resultCount: number;
};

export function FilterBar({ value, onChange, onReset, resultCount }: Props) {
  const set = <K extends keyof FilterState>(key: K) =>
    (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const raw = event.target.value;
      const parsed =
        key === "year" ? (raw === "All" ? "All" : Number(raw)) : raw;
      onChange({ ...value, [key]: parsed as FilterState[K] });
    };

  const isFiltered =
    value.sector !== "All" ||
    value.dealType !== "All" ||
    value.status !== "All" ||
    value.year !== "All" ||
    value.query !== "";

  return (
    <section
      aria-label="Filters"
      className="rounded-xl border border-hairline bg-surface p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Field label="Search">
            <input
              type="search"
              value={value.query}
              onChange={set("query")}
              placeholder="Acquirer or target…"
              className={fieldClass}
            />
          </Field>
        </div>
        <Field label="Sector">
          <select value={value.sector} onChange={set("sector")} className={fieldClass}>
            <option value="All">All sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Deal type">
          <select value={value.dealType} onChange={set("dealType")} className={fieldClass}>
            <option value="All">All types</option>
            {dealTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select value={value.status} onChange={set("status")} className={fieldClass}>
            <option value="All">Any status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Announced">
          <select value={String(value.year)} onChange={set("year")} className={fieldClass}>
            <option value="All">Any year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-3">
        <p className="text-xs text-ink-secondary" role="status">
          <span className="tabular-nums">{resultCount}</span>{" "}
          {resultCount === 1 ? "deal" : "deals"} shown
          {isFiltered && (
            <>
              {" · "}
              <button
                type="button"
                onClick={onReset}
                className="underline underline-offset-2 hover:text-ink"
              >
                clear filters
              </button>
            </>
          )}
        </p>
        <label className="flex items-center gap-2 text-xs text-ink-muted">
          Sort
          <select
            value={value.sort}
            onChange={set("sort")}
            className="rounded-md border border-hairline bg-surface-raised px-2 py-1.5 text-xs text-ink"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>{sortLabels[key]}</option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
