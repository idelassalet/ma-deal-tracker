import { DealExplorer } from "@/components/DealExplorer";
import { deals } from "@/lib/deals";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {deals.length} M&amp;A deals, 2016–2024
        </h1>
        <p className="mt-3 text-ink-secondary">
          For each one: what was paid, how it was paid for, why the acquirer
          said it made sense, and what happened between signing and closing.
          Three of them never closed. Changing the filters updates the figures,
          the charts and the table together.
        </p>
      </section>
      <DealExplorer />
    </div>
  );
}
