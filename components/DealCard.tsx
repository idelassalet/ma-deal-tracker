import Link from "next/link";
import { formatPct, formatUsdB, type Deal } from "@/lib/deals";
import { StatusBadge } from "./StatusBadge";

/** Mobile presentation of a deal row. */
export function DealCard({ deal }: { deal: Deal }) {
  return (
    <li className="rounded-xl border border-hairline bg-surface">
      <Link
        href={`/deals/${deal.id}`}
        className="block rounded-xl p-4 transition-colors hover:bg-surface-raised"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium leading-snug">
            {deal.acquirer}{" "}
            <span aria-hidden className="text-ink-muted">→</span>{" "}
            <span className="sr-only">acquires</span>
            {deal.target}
          </p>
          <p className="shrink-0 text-right text-lg font-semibold tabular-nums">
            {formatUsdB(deal.valueUsdB)}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-secondary">
          <StatusBadge status={deal.status} />
          <span>{deal.sector}</span>
          <span className="text-ink-muted">·</span>
          <span>{deal.dealType}</span>
          <span className="text-ink-muted">·</span>
          <span className="tabular-nums">{deal.announced.slice(0, 4)}</span>
          <span className="text-ink-muted">·</span>
          <span className="tabular-nums">
            {deal.premiumPct == null
              ? "premium n/a"
              : `${formatPct(deal.premiumPct)} premium`}
          </span>
        </div>
      </Link>
    </li>
  );
}
