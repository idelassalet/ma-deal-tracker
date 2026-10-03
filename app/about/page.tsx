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
        The tracker covers {deals.length} deals announced between 2016 and 2024
        across {sectors.length} sectors. I picked them to cover the different deal
        structures and outcomes rather than just the biggest ones by value. The
        three that were abandoned are as useful as the ones that closed.
      </p>

      <Section title="Deal classification">
        <p>
          Every deal is tagged with one of {dealTypes.length} structures. This is
          the first thing you look at, because it drives both how you value the
          deal and how regulators are likely to treat it.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Horizontal</strong> — same industry, same
            stage of the value chain. Bought for scale and market share, and the
            structure most likely to run into antitrust problems over market
            concentration. Kroger and Albertsons is the clearest failure here.
          </li>
          <li>
            <strong className="text-ink">Vertical</strong> — different stages of
            the same value chain, bought to control supply or distribution. These
            used to clear easily. CVS-Aetna and AT&amp;T-Time Warner are why that
            is no longer a safe assumption.
          </li>
          <li>
            <strong className="text-ink">Conglomerate</strong> — unrelated
            businesses, bought for diversification or just to put capital to work.
            Berkshire and Alleghany is the obvious example.
          </li>
          <li>
            <strong className="text-ink">LBO / take-private</strong> — a sponsor
            or an individual taking a public company private using debt. The
            returns come from leverage and restructuring, not from synergies.
          </li>
        </ul>
      </Section>

      <Section title="Consideration — how it was paid for">
        <p>
          Cash locks in the price for the seller and puts debt on the
          acquirer&apos;s balance sheet. Paying in stock makes the seller a part-owner
          of the combined company, so they share the upside from synergies but
          also carry the price risk until closing. AMD-Xilinx is the clearest
          case: announced at $35bn, worth about $49bn by the time it closed
          because AMD&apos;s shares had risen. Mixed cash and stock sits in between
          and is common in large strategic deals.
        </p>
      </Section>

      <Section title="Acquisition premium">
        <p>
          The premium is how much the offer sits above the target&apos;s
          <em> unaffected</em> share price, meaning the price before the deal
          leaked or was announced. It is what the buyer pays for control, and the
          synergy case has to cover it. Premiums here are rounded to the nearest
          percent and left blank where there is no clean figure: mergers of equals
          with no premium at all (Raytheon and United Technologies), prices
          renegotiated part-way through, or contested auctions where it is not
          obvious which price was the unaffected one.
        </p>
      </Section>

      <Section title="Deal certainty — signing is not closing">
        <p>
          Most of the interesting work happens between announcement and closing,
          so each deal page shows how long that took. The set covers antitrust
          litigation (JetBlue-Spirit), a remedy package the courts rejected as
          too weak (Kroger-Albertsons), a conduct remedy aimed at one individual
          (ExxonMobil-Pioneer), a right-of-first-refusal arbitration that held
          things up for nearly two years (Chevron-Hess), a price renegotiated
          under litigation (LVMH-Tiffany), and a buyer forced to close by a
          specific performance suit (Musk-Twitter).
        </p>
      </Section>

      <Section title="Sources and limitations">
        <p>
          Values are the headline transaction values reported at announcement,
          which is equity value unless the notes say otherwise. That means they
          are not perfectly comparable across deals that treat debt differently.
          Every deal links to a primary source: a company press release, an SEC
          filing, or a statement from the regulator. The data is a fixed list I
          put together by hand for this project, not a live market database.
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
