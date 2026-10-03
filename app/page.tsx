import { DealExplorer } from "@/components/DealExplorer";
import { deals } from "@/lib/deals";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {deals.length} deals that defined the last decade of M&amp;A
        </h1>
        <p className="mt-3 text-ink-secondary">
          Each entry records what was paid, how it was paid for, the strategic
          logic the acquirer put forward, and what actually happened between
          signing and closing — including the three deals that never closed at
          all. Filter the set and the figures, charts and table below all follow.
        </p>
      </section>
      <DealExplorer />
    </div>
  );
}
