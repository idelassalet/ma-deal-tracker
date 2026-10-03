import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import {
  deals,
  formatDate,
  formatPct,
  formatUsdB,
  getDeal,
  monthsToResolve,
} from "@/lib/deals";

export function generateStaticParams() {
  return deals.map((deal) => ({ id: deal.id }));
}

export async function generateMetadata({ params }: PageProps<"/deals/[id]">) {
  const { id } = await params;
  const deal = getDeal(id);
  if (!deal) return { title: "Deal not found" };
  return {
    title: `${deal.acquirer} / ${deal.target}`,
    description: `${formatUsdB(deal.valueUsdB)} ${deal.dealType.toLowerCase()} deal — ${deal.rationale}`,
  };
}

function Term({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-t border-hairline py-3">
      <dt className="text-xs font-medium tracking-wide text-ink-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}

export default async function DealPage({ params }: PageProps<"/deals/[id]">) {
  const { id } = await params;
  const deal = getDeal(id);
  if (!deal) notFound();

  const months = monthsToResolve(deal);
  const related = deals
    .filter((other) => other.sector === deal.sector && other.id !== deal.id)
    .sort((a, b) => b.valueUsdB - a.valueUsdB)
    .slice(0, 4);
  const resolvedLabel = deal.status === "Terminated" ? "Abandoned" : "Closed";

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="text-sm text-ink-secondary hover:text-ink hover:underline underline-offset-2"
      >
        ← All deals
      </Link>

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={deal.status} />
          <span className="text-xs text-ink-muted">
            {deal.sector} · {deal.dealType}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {deal.acquirer}{" "}
          <span aria-hidden className="text-ink-muted">→</span>{" "}
          <span className="sr-only">acquires</span>
          {deal.target}
        </h1>
        <p className="mt-4 text-5xl font-semibold tracking-tight">
          {formatUsdB(deal.valueUsdB)}
        </p>
        <p className="mt-1 text-sm text-ink-secondary">
          headline transaction value at announcement · {deal.consideration.toLowerCase()}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-sm font-medium tracking-wide text-ink-muted uppercase">
          Timeline
        </h2>
        <ol className="mt-3 rounded-xl border border-hairline bg-surface p-4 text-sm">
          <li className="flex items-baseline justify-between gap-4 py-1.5">
            <span className="text-ink-secondary">Announced</span>
            <span className="tabular-nums">{formatDate(deal.announced)}</span>
          </li>
          <li className="flex items-baseline justify-between gap-4 border-t border-hairline py-1.5">
            <span className="text-ink-secondary">{resolvedLabel}</span>
            <span className="tabular-nums">{formatDate(deal.resolved)}</span>
          </li>
          <li className="flex items-baseline justify-between gap-4 border-t border-hairline py-1.5">
            <span className="text-ink-secondary">Time from signing</span>
            <span className="tabular-nums">
              {months == null
                ? "still outstanding"
                : `${months} ${months === 1 ? "month" : "months"}`}
            </span>
          </li>
        </ol>
      </section>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="text-sm font-medium tracking-wide text-ink-muted uppercase">
            Strategic rationale
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            {deal.rationale}
          </p>
        </section>
        <section>
          <h2 className="text-sm font-medium tracking-wide text-ink-muted uppercase">
            What happened
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            {deal.outcome}
          </p>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-medium tracking-wide text-ink-muted uppercase">
          Terms
        </h2>
        <dl className="mt-3 grid gap-x-8 sm:grid-cols-2">
          <Term label="Consideration" value={deal.consideration} />
          <Term
            label="Premium to unaffected price"
            value={
              deal.premiumPct == null ? (
                <span className="text-ink-muted">
                  Not cleanly reported — see notes
                </span>
              ) : (
                <span className="tabular-nums">{formatPct(deal.premiumPct)}</span>
              )
            }
          />
          <Term label="Deal classification" value={deal.dealType} />
          <Term label="Sector" value={deal.sector} />
        </dl>
      </section>


      <section className="mt-10 border-t border-hairline pt-6">
        <h2 className="text-sm font-medium tracking-wide text-ink-muted uppercase">
          Other {deal.sector} deals
        </h2>
        {related.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">
            This is the only deal tracked in the sector.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-hairline">
            {related.map((other) => (
              <li key={other.id}>
                <Link
                  href={`/deals/${other.id}`}
                  className="flex items-baseline justify-between gap-4 py-2.5 text-sm hover:underline underline-offset-2"
                >
                  <span>
                    {other.acquirer}{" "}
                    <span aria-hidden className="text-ink-muted">→</span>{" "}
                    {other.target}
                  </span>
                  <span className="shrink-0 text-ink-secondary tabular-nums">
                    {formatUsdB(other.valueUsdB)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-10 border-t border-hairline pt-4">
        <a
          href={deal.source}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm text-ink-secondary hover:text-ink hover:underline underline-offset-2"
        >
          Primary source ↗
        </a>
      </footer>
    </article>
  );
}
