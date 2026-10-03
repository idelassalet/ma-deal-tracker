import Link from "next/link";
import { formatPct, formatUsdB, type Deal } from "@/lib/deals";
import { StatusBadge } from "./StatusBadge";

const headers = [
  "Acquirer / target",
  "Value",
  "Sector",
  "Type",
  "Consideration",
  "Premium",
  "Announced",
  "Status",
];

/**
 * The table view — also the accessible fallback for the charts above it, since
 * every plotted value is readable here as text.
 */
export function DealTable({ deals }: { deals: Deal[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-hairline bg-surface">
      <table className="w-full min-w-[56rem] border-collapse text-sm">
        <caption className="sr-only">
          Tracked M&amp;A transactions with deal value, structure and status
        </caption>
        <thead>
          <tr className="border-b border-hairline text-left">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-3 py-2.5 text-xs font-medium tracking-wide text-ink-muted uppercase whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr
              key={deal.id}
              className="border-b border-hairline last:border-0 transition-colors hover:bg-surface-raised"
            >
              <th scope="row" className="px-3 py-3 text-left font-normal">
                <Link
                  href={`/deals/${deal.id}`}
                  className="font-medium hover:underline underline-offset-2"
                >
                  {deal.acquirer}{" "}
                  <span aria-hidden className="text-ink-muted">→</span>{" "}
                  {deal.target}
                </Link>
              </th>
              <td className="px-3 py-3 font-medium tabular-nums whitespace-nowrap">
                {formatUsdB(deal.valueUsdB)}
              </td>
              <td className="px-3 py-3 text-ink-secondary whitespace-nowrap">
                {deal.sector}
              </td>
              <td className="px-3 py-3 text-ink-secondary whitespace-nowrap">
                {deal.dealType}
              </td>
              <td className="px-3 py-3 text-ink-secondary whitespace-nowrap">
                {deal.consideration}
              </td>
              <td className="px-3 py-3 text-ink-secondary tabular-nums">
                {formatPct(deal.premiumPct ?? null)}
              </td>
              <td className="px-3 py-3 text-ink-secondary tabular-nums whitespace-nowrap">
                {deal.announced.slice(0, 4)}
              </td>
              <td className="px-3 py-3">
                <StatusBadge status={deal.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
