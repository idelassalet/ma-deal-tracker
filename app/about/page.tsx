import type { Metadata } from "next";
import Link from "next/link";
import { deals, dealTypes, sectors } from "@/lib/deals";

export const metadata: Metadata = {
  title: "Method & concepts",
  description:
    "How the dataset was built, and the M&A concepts the tracker encodes: deal classification, consideration mix, acquisition premium, and deal certainty.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-secondary">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Method &amp; concepts
      </h1>
      <p className="mt-3 text-ink-secondary">
        The tracker covers {deals.length} transactions announced between 2016 and
        2024, spanning {sectors.length} sectors. Deals were selected to span the
        full range of structures and outcomes rather than simply the largest by
        value — the abandoned deals carry as much of the lesson as the completed
        ones.
      </p>

      <Section title="Deal classification">
        <p>
          Every deal is tagged with one of {dealTypes.length} structures, which is
          the first thing that determines how a transaction is analysed and how
          regulators will treat it.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Horizontal</strong> — same industry, same
            stage of the value chain. Bought for scale and market share, and the
            structure most exposed to antitrust challenge on market
            concentration. Kroger / Albertsons is the clearest failure case.
          </li>
          <li>
            <strong className="text-ink">Vertical</strong> — different stages of
            the same value chain, bought to control supply or distribution.
            Historically cleared easily; CVS / Aetna and AT&amp;T / Time Warner
            are why that assumption is now contested.
          </li>
          <li>
            <strong className="text-ink">Conglomerate</strong> — unrelated
            businesses, bought for diversification or capital allocation.
            Berkshire / Alleghany is the type specimen.
          </li>
          <li>
            <strong className="text-ink">LBO / take-private</strong> — a sponsor
            or individual taking a public company private with debt. Returns come
            from leverage and restructuring rather than synergies.
          </li>
        </ul>
      </Section>

      <Section title="Consideration — how it was paid for">
        <p>
          Cash fixes the price for the seller and loads the acquirer&apos;s balance
          sheet with debt. Stock makes the seller a co-owner of the combined
          entity, which means they share both the synergy upside and the price
          risk: AMD / Xilinx was announced at $35bn and closed at roughly $49bn
          because AMD&apos;s shares rose during the review. Cash-and-stock splits the
          difference and is common in large strategic deals.
        </p>
      </Section>

      <Section title="Acquisition premium">
        <p>
          The premium is the excess of the offer price over the target&apos;s
          <em> unaffected</em> share price — the price before the deal leaked or
          was announced. It is the price of control, and it is the number a
          synergy case has to justify. Premiums here are rounded to the nearest
          percentage point and are omitted where no clean figure exists: mergers
          of equals with no premium (Raytheon / United Technologies), prices
          renegotiated mid-deal, or contested auctions where the unaffected price
          is ambiguous.
        </p>
      </Section>

      <Section title="Deal certainty — signing is not closing">
        <p>
          The gap between announcement and resolution is where most of the
          interesting work happens, and the tracker records it explicitly. The
          set includes antitrust litigation (JetBlue / Spirit), remedy packages
          that regulators rejected as inadequate (Kroger / Albertsons), conduct
          remedies aimed at individuals (ExxonMobil / Pioneer), a joint-venture
          right-of-first-refusal arbitration that delayed closing by nearly two
          years (Chevron / Hess), a price renegotiated under litigation
          (LVMH / Tiffany), and a specific-performance suit that forced a
          reluctant buyer to close (Musk / Twitter).
        </p>
      </Section>

      <Section title="Sources and limitations">
        <p>
          Values are headline transaction values as reported at announcement —
          equity value unless a deal&apos;s notes say otherwise — so they are not
          strictly comparable across deals with very different debt treatment.
          Every deal links to a primary source: a company press release, an SEC
          filing, or a regulator&apos;s own statement. The dataset is static and
          hand-curated; it is a teaching set, not a market database.
        </p>
      </Section>

      <p className="mt-10">
        <Link
          href="/"
          className="text-sm text-ink-secondary hover:text-ink hover:underline underline-offset-2"
        >
          ← Back to the tracker
        </Link>
      </p>
    </div>
  );
}
