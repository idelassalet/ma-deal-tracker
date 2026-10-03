/**
 * Curated dataset of notable M&A transactions.
 *
 * All values are the headline transaction value as reported at announcement
 * (equity value unless the note says otherwise) in USD billions. Premiums are
 * the reported premium to the target's unaffected share price and are rounded;
 * where a premium was never cleanly reported (mergers of equals, multi-party
 * auctions, renegotiated prices) the field is omitted rather than guessed.
 */

export type Sector =
  | "Technology"
  | "Healthcare"
  | "Energy"
  | "Consumer & Retail"
  | "Media & Telecom"
  | "Financials"
  | "Industrials"
  | "Materials";

/**
 * Strategic classification taught in the course:
 * - Horizontal: same industry, same stage of the value chain (scale, market share).
 * - Vertical: different stage of the same value chain (supply or distribution control).
 * - Conglomerate: unrelated businesses (diversification, capital allocation).
 * - LBO / Take-private: financial sponsor or individual, debt-funded, public-to-private.
 */
export type DealType = "Horizontal" | "Vertical" | "Conglomerate" | "LBO / Take-private";

export type DealStatus = "Completed" | "Pending" | "Terminated";

export type Consideration = "All cash" | "All stock" | "Cash & stock";

export type Deal = {
  id: string;
  acquirer: string;
  target: string;
  /** Headline transaction value, USD billions. */
  valueUsdB: number;
  /** ISO date the deal was announced. */
  announced: string;
  /** ISO date the deal closed, or was formally abandoned. Null if neither yet. */
  resolved: string | null;
  sector: Sector;
  dealType: DealType;
  status: DealStatus;
  consideration: Consideration;
  /** Reported premium to the unaffected share price, percent. */
  premiumPct?: number;
  /** The strategic thesis the acquirer put forward. */
  rationale: string;
  /** How it actually played out — regulatory fights, renegotiations, outcomes. */
  outcome: string;
  source: string;
};

export const deals: Deal[] = [
  {
    id: "microsoft-activision",
    acquirer: "Microsoft",
    target: "Activision Blizzard",
    valueUsdB: 68.7,
    announced: "2022-01-18",
    resolved: "2023-10-13",
    sector: "Technology",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 45,
    rationale:
      "Buy a first-party content portfolio (Call of Duty, Candy Crush, World of Warcraft) to anchor Game Pass subscriptions and give Microsoft a mobile gaming foothold it had never built organically.",
    outcome:
      "The largest gaming deal ever took 21 months to clear. The UK CMA initially blocked it and the US FTC sued to stop it; Microsoft restructured by divesting cloud-streaming rights for Activision titles to Ubisoft, which satisfied the CMA on a re-filed deal.",
    source: "https://news.microsoft.com/2022/01/18/microsoft-to-acquire-activision-blizzard/",
  },
  {
    id: "broadcom-vmware",
    acquirer: "Broadcom",
    target: "VMware",
    valueUsdB: 61,
    announced: "2022-05-26",
    resolved: "2023-11-22",
    sector: "Technology",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "Cash & stock",
    rationale:
      "Pivot Broadcom from semiconductors toward high-margin infrastructure software, bolting VMware's virtualization franchise onto an existing enterprise software roll-up strategy.",
    outcome:
      "Cleared globally after an 18-month review. Post-close licensing changes — moving VMware from perpetual licenses to subscription bundles — drew sharp customer and European regulatory criticism, a reminder that antitrust clearance does not settle buyer-power concerns.",
    source: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-completes-acquisition-vmware",
  },
  {
    id: "nvidia-arm",
    acquirer: "Nvidia",
    target: "Arm (from SoftBank)",
    valueUsdB: 40,
    announced: "2020-09-13",
    resolved: "2022-02-08",
    sector: "Technology",
    dealType: "Vertical",
    status: "Terminated",
    consideration: "Cash & stock",
    rationale:
      "Own the CPU instruction-set architecture underpinning nearly all mobile and embedded computing, and pair it with Nvidia's accelerator roadmap for data-center AI.",
    outcome:
      "Abandoned after 17 months. The US FTC sued and UK and EU regulators opened in-depth reviews, all centred on the same theory: Arm licenses to Nvidia's own competitors, so a Nvidia-owned Arm could foreclose them. SoftBank kept a $1.25bn break fee and took Arm public instead.",
    source: "https://nvidianews.nvidia.com/news/nvidia-and-softbank-group-announce-termination-of-nvidias-acquisition-of-arm-limited",
  },
  {
    id: "amd-xilinx",
    acquirer: "AMD",
    target: "Xilinx",
    valueUsdB: 35,
    announced: "2020-10-27",
    resolved: "2022-02-14",
    sector: "Technology",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All stock",
    premiumPct: 25,
    rationale:
      "Add FPGAs and adaptive computing to a CPU/GPU portfolio, widening AMD's addressable market in data center, networking and automotive against Intel.",
    outcome:
      "An all-stock deal announced at $35bn closed at roughly $49bn in value as AMD's share price rose through the review — a textbook illustration of why stock consideration shifts price risk onto the seller's shareholders.",
    source: "https://ir.amd.com/news-events/press-releases/detail/1017/amd-completes-acquisition-of-xilinx",
  },
  {
    id: "ibm-redhat",
    acquirer: "IBM",
    target: "Red Hat",
    valueUsdB: 34,
    announced: "2018-10-28",
    resolved: "2019-07-09",
    sector: "Technology",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 63,
    rationale:
      "Buy a credible hybrid-cloud platform (OpenShift, RHEL) to reposition a declining legacy IT services business, selling portability across AWS, Azure and on-premise estates.",
    outcome:
      "IBM's largest acquisition, funded largely with debt, and paid at one of the richest premiums in large-cap software. Red Hat was kept operationally separate to preserve its open-source community standing.",
    source: "https://newsroom.ibm.com/2019-07-09-IBM-Closes-Landmark-Acquisition-of-Red-Hat-for-34-Billion-Defines-Open-Hybrid-Cloud-Future",
  },
  {
    id: "salesforce-slack",
    acquirer: "Salesforce",
    target: "Slack",
    valueUsdB: 27.7,
    announced: "2020-12-01",
    resolved: "2021-07-21",
    sector: "Technology",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "Cash & stock",
    premiumPct: 54,
    rationale:
      "Make Slack the interface layer for Customer 360 and blunt Microsoft Teams, which had been bundled into Office 365 and was taking the collaboration market.",
    outcome:
      "Closed quickly and cleanly, but became the focal point of the activist campaign that followed: investors argued Salesforce had overpaid for growth, and the company subsequently committed to margin discipline and buybacks.",
    source: "https://www.salesforce.com/news/press-releases/2021/07/21/salesforce-completes-acquisition-of-slack/",
  },
  {
    id: "microsoft-linkedin",
    acquirer: "Microsoft",
    target: "LinkedIn",
    valueUsdB: 26.2,
    announced: "2016-06-13",
    resolved: "2016-12-08",
    sector: "Technology",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 50,
    rationale:
      "Connect the world's professional graph to Office and Dynamics — identity and relationship data that Microsoft could not replicate, feeding recruiting, sales and learning products.",
    outcome:
      "Cleared in under six months with EU commitments on interoperability. Widely judged a success: LinkedIn revenue more than quadrupled post-close while operating semi-independently.",
    source: "https://news.microsoft.com/2016/06/13/microsoft-to-acquire-linkedin/",
  },
  {
    id: "microsoft-nuance",
    acquirer: "Microsoft",
    target: "Nuance Communications",
    valueUsdB: 19.7,
    announced: "2021-04-12",
    resolved: "2022-03-04",
    sector: "Healthcare",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 23,
    rationale:
      "Acquire clinical speech recognition and ambient documentation embedded in US hospital workflows, giving Azure a vertical AI wedge into healthcare.",
    outcome:
      "Cleared in the US quickly; the UK CMA ran a Phase 1 review before unconditional clearance. The Nuance asset later became the base for Microsoft's DAX clinical AI products.",
    source: "https://news.microsoft.com/2021/04/12/microsoft-accelerates-industry-cloud-strategy-for-healthcare-with-the-acquisition-of-nuance/",
  },
  {
    id: "vista-elliott-citrix",
    acquirer: "Vista Equity Partners & Elliott Management",
    target: "Citrix Systems",
    valueUsdB: 16.5,
    announced: "2022-01-31",
    resolved: "2022-09-30",
    sector: "Technology",
    dealType: "LBO / Take-private",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 30,
    rationale:
      "Take a cash-generative but slow-growing virtualization business private, merge it with Vista's TIBCO, and restructure away from public-market growth expectations.",
    outcome:
      "One of the last mega-LBOs financed before rates moved: banks were left holding roughly $15bn of debt they could not syndicate and sold it at a steep discount, effectively closing the large-LBO debt window for a year.",
    source: "https://www.citrix.com/news/announcements/sep-2022/citrix-and-tibco-complete-merger.html",
  },
  {
    id: "musk-twitter",
    acquirer: "Elon Musk",
    target: "Twitter",
    valueUsdB: 44,
    announced: "2022-04-25",
    resolved: "2022-10-27",
    sector: "Media & Telecom",
    dealType: "LBO / Take-private",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 38,
    rationale:
      "A single-buyer take-private premised on relaxing content moderation and rebuilding the product around subscriptions rather than advertising.",
    outcome:
      "The canonical deal-certainty case. Musk signed without customary due diligence, then tried to terminate over spam-account disclosures; Twitter sued in Delaware to enforce specific performance and he closed on the original terms days before trial. Roughly $13bn of acquisition debt stayed on the company.",
    source: "https://www.sec.gov/Archives/edgar/data/1418091/000119312522120461/d310843dex21.htm",
  },
  {
    id: "cvs-aetna",
    acquirer: "CVS Health",
    target: "Aetna",
    valueUsdB: 69,
    announced: "2017-12-03",
    resolved: "2018-11-28",
    sector: "Healthcare",
    dealType: "Vertical",
    status: "Completed",
    consideration: "Cash & stock",
    premiumPct: 29,
    rationale:
      "Integrate an insurer with a pharmacy and PBM to control the full cost of care, partly as a defensive response to Amazon's entry into pharmacy distribution.",
    outcome:
      "Cleared with a divestiture of Aetna's Medicare Part D business, but the presiding judge took the unusual step of reopening the Tunney Act review after closing before ultimately approving the consent decree.",
    source: "https://www.cvshealth.com/news/company-news/cvs-health-completes-acquisition-of-aetna-marking-the-start-of-transforming-the-consumer-health-experience.html",
  },
  {
    id: "cigna-express-scripts",
    acquirer: "Cigna",
    target: "Express Scripts",
    valueUsdB: 67,
    announced: "2018-03-08",
    resolved: "2018-12-20",
    sector: "Healthcare",
    dealType: "Vertical",
    status: "Completed",
    consideration: "Cash & stock",
    premiumPct: 31,
    rationale:
      "The mirror image of CVS–Aetna: an insurer buying the largest independent pharmacy benefit manager to internalise drug-pricing margin.",
    outcome:
      "Cleared by the DOJ without divestitures. Within a year the two deals had effectively eliminated the independent PBM model, which is now the standing example of vertical consolidation reshaping an entire industry structure.",
    source: "https://newsroom.cigna.com/cigna-completes-combination-with-express-scripts",
  },
  {
    id: "pfizer-seagen",
    acquirer: "Pfizer",
    target: "Seagen",
    valueUsdB: 43,
    announced: "2023-03-13",
    resolved: "2023-12-14",
    sector: "Healthcare",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 33,
    rationale:
      "Redeploy COVID-era cash into antibody-drug conjugates to refill an oncology pipeline facing a well-telegraphed patent cliff.",
    outcome:
      "Funded with roughly $31bn of new debt. The FTC closed its review without conditions — the pipelines were complementary rather than overlapping, which is the standard path to clearance in large pharma deals.",
    source: "https://www.pfizer.com/news/press-release/press-release-detail/pfizer-invests-43-billion-battle-cancer",
  },
  {
    id: "amgen-horizon",
    acquirer: "Amgen",
    target: "Horizon Therapeutics",
    valueUsdB: 27.8,
    announced: "2022-12-12",
    resolved: "2023-10-06",
    sector: "Healthcare",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 20,
    rationale:
      "Acquire rare-disease franchises — principally Tepezza for thyroid eye disease — with durable pricing and no near-term generic exposure.",
    outcome:
      "The FTC sued on a novel bundling theory: that Amgen could leverage its blockbuster portfolio in rebate negotiations to protect Horizon's drugs. It settled with a behavioural consent order barring that conduct, the first major test of that theory in pharma.",
    source: "https://www.amgen.com/newsroom/press-releases/2023/10/amgen-completes-acquisition-of-horizon-therapeutics-plc",
  },
  {
    id: "exxon-pioneer",
    acquirer: "ExxonMobil",
    target: "Pioneer Natural Resources",
    valueUsdB: 59.5,
    announced: "2023-10-11",
    resolved: "2024-05-03",
    sector: "Energy",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All stock",
    premiumPct: 18,
    rationale:
      "Consolidate contiguous Permian Basin acreage to more than double Exxon's output there and apply its development model to Pioneer's inventory — scale economics, not reserve replacement at any price.",
    outcome:
      "Cleared after the FTC required that Pioneer's former CEO be barred from the combined board over alleged collusive communications with OPEC — a conduct remedy aimed at an individual rather than the structure of the deal.",
    source: "https://corporate.exxonmobil.com/news/news-releases/2024/0503_exxonmobil-completes-acquisition-of-pioneer-natural-resources",
  },
  {
    id: "chevron-hess",
    acquirer: "Chevron",
    target: "Hess",
    valueUsdB: 53,
    announced: "2023-10-23",
    resolved: "2025-07-18",
    sector: "Energy",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All stock",
    rationale:
      "Buy into the Stabroek block offshore Guyana — among the highest-return oil discoveries of the era — to extend Chevron's production growth runway into the 2030s.",
    outcome:
      "Delayed almost two years not by antitrust but by contract: ExxonMobil and CNOOC claimed a right of first refusal over Hess's Guyana stake. An ICC arbitration panel rejected the claim in July 2025 and the deal closed days later — a reminder that JV consent rights can be a harder gate than regulators.",
    source: "https://www.chevron.com/newsroom/2025/q3/chevron-completes-acquisition-of-hess",
  },
  {
    id: "lvmh-tiffany",
    acquirer: "LVMH",
    target: "Tiffany & Co.",
    valueUsdB: 15.8,
    announced: "2019-11-25",
    resolved: "2021-01-07",
    sector: "Consumer & Retail",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 32,
    rationale:
      "Add a hard-luxury American brand to a portfolio weighted toward fashion and leather goods, and apply LVMH's retail and marketing machine to an under-managed jewellery house.",
    outcome:
      "Renegotiated, not abandoned. LVMH sought to exit during the pandemic, Tiffany sued in Delaware, and the parties settled on a reduced price of $131.50 from $135 per share — a rare instance of a buyer extracting a real price cut without an explicit pandemic carve-out in the MAC clause.",
    source: "https://www.lvmh.com/en/publications/lvmh-completes-the-acquisition-of-tiffany-co",
  },
  {
    id: "amazon-wholefoods",
    acquirer: "Amazon",
    target: "Whole Foods Market",
    valueUsdB: 13.7,
    announced: "2017-06-16",
    resolved: "2017-08-28",
    sector: "Consumer & Retail",
    dealType: "Vertical",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 27,
    rationale:
      "Acquire physical grocery footprint, cold-chain logistics and a trusted food brand in one step, after years of failing to crack grocery with AmazonFresh alone.",
    outcome:
      "Cleared in ten weeks with no conditions — in hindsight the most-cited example of permissive merger review in tech, and a major input into the subsequent push for structural antitrust reform.",
    source: "https://press.aboutamazon.com/2017/8/amazon-and-whole-foods-market-announce-acquisition-to-close-this-monday-will-work-together-to-make-high-quality-natural-and-organic-food-affordable-for-everyone",
  },
  {
    id: "kroger-albertsons",
    acquirer: "Kroger",
    target: "Albertsons",
    valueUsdB: 24.6,
    announced: "2022-10-14",
    resolved: "2024-12-11",
    sector: "Consumer & Retail",
    dealType: "Horizontal",
    status: "Terminated",
    consideration: "All cash",
    premiumPct: 33,
    rationale:
      "Combine the two largest traditional US supermarket chains to match the purchasing scale of Walmart, Costco and Amazon.",
    outcome:
      "Blocked. Kroger proposed divesting 579 stores to C&S Wholesale Grocers, but federal and state courts found the remedy inadequate — the buyer lacked the scale to compete — and granted injunctions. Albertsons terminated the next day and sued Kroger over its efforts to obtain clearance.",
    source: "https://www.ftc.gov/news-events/news/press-releases/2024/12/statement-regarding-kroger-albertsons-abandoning-proposed-merger",
  },
  {
    id: "disney-fox",
    acquirer: "The Walt Disney Company",
    target: "21st Century Fox",
    valueUsdB: 71.3,
    announced: "2017-12-14",
    resolved: "2019-03-20",
    sector: "Media & Telecom",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "Cash & stock",
    rationale:
      "Assemble the content library and Hulu control needed to launch Disney+ directly against Netflix, accepting near-term earnings dilution for a direct consumer relationship.",
    outcome:
      "A live auction: Comcast counterbid, forcing Disney to raise from $52.4bn to $71.3bn and add a cash component. Cleared after divesting the Fox regional sports networks. Disney later wrote down significant value, and the price is the standard case study in competitive-bidding overpayment.",
    source: "https://thewaltdisneycompany.com/disney-acquires-21st-century-fox/",
  },
  {
    id: "amazon-mgm",
    acquirer: "Amazon",
    target: "MGM Studios",
    valueUsdB: 8.5,
    announced: "2021-05-26",
    resolved: "2022-03-17",
    sector: "Media & Telecom",
    dealType: "Vertical",
    status: "Completed",
    consideration: "All cash",
    rationale:
      "Buy a 4,000-title catalogue and the James Bond franchise as content supply for Prime Video, where the strategic return is Prime retention rather than studio profit.",
    outcome:
      "Closed after the EU cleared it unconditionally and the FTC, deadlocked, let the waiting period expire without action. Amazon later acquired creative control over the Bond franchise, which it had not obtained at close.",
    source: "https://press.aboutamazon.com/2022/3/amazon-and-mgm-join-forces",
  },
  {
    id: "att-timewarner",
    acquirer: "AT&T",
    target: "Time Warner",
    valueUsdB: 85.4,
    announced: "2016-10-22",
    resolved: "2018-06-14",
    sector: "Media & Telecom",
    dealType: "Vertical",
    status: "Completed",
    consideration: "Cash & stock",
    premiumPct: 36,
    rationale:
      "Pair distribution (wireless and DirecTV) with premium content (HBO, Warner Bros., Turner) so AT&T could monetise its subscriber base with owned programming and advertising data.",
    outcome:
      "Won in court and lost in practice. The DOJ's rare vertical-merger challenge failed at trial and on appeal, but AT&T spun Warner off to Discovery in 2022 for far less than it paid — the standard example of a deal that cleared antitrust review and still destroyed value.",
    source: "https://about.att.com/story/att_completes_acquisition_of_time_warner_inc.html",
  },
  {
    id: "capital-one-discover",
    acquirer: "Capital One",
    target: "Discover Financial Services",
    valueUsdB: 35.3,
    announced: "2024-02-19",
    resolved: "2025-05-18",
    sector: "Financials",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All stock",
    premiumPct: 27,
    rationale:
      "Acquire a payments network, not just a card book — owning rails lets Capital One capture interchange and reduce dependence on Visa and Mastercard.",
    outcome:
      "Required Federal Reserve and OCC approval on top of antitrust review, and drew heavy political opposition on consumer-credit concentration. Approved in April 2025 and closed the following month, creating the largest US credit-card issuer by balances.",
    source: "https://www.federalreserve.gov/newsevents/pressreleases/orders20250418a.htm",
  },
  {
    id: "berkshire-alleghany",
    acquirer: "Berkshire Hathaway",
    target: "Alleghany",
    valueUsdB: 11.6,
    announced: "2022-03-21",
    resolved: "2022-10-19",
    sector: "Financials",
    dealType: "Conglomerate",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 29,
    rationale:
      "Deploy idle cash into an insurance and reinsurance underwriter whose float Berkshire can reinvest — the classic conglomerate logic of buying capital-generating businesses outright.",
    outcome:
      "Negotiated directly with no auction and no bankers on Berkshire's side; Buffett explicitly refused to pay the seller's advisory fee out of the price. Cleared without issue.",
    source: "https://www.berkshirehathaway.com/news/oct1922.pdf",
  },
  {
    id: "jetblue-spirit",
    acquirer: "JetBlue Airways",
    target: "Spirit Airlines",
    valueUsdB: 3.8,
    announced: "2022-07-28",
    resolved: "2024-03-04",
    sector: "Industrials",
    dealType: "Horizontal",
    status: "Terminated",
    consideration: "All cash",
    rationale:
      "Acquire aircraft and pilots at speed to reach the scale needed to compete with the big four US carriers, having lost the organic growth race post-pandemic.",
    outcome:
      "Blocked. JetBlue won the bidding war against Frontier, then lost in court: the judge accepted the DOJ's case that removing Spirit would eliminate the ultra-low-cost discipline that constrains fares. JetBlue paid Spirit a $69m termination fee and Spirit filed for Chapter 11 later that year.",
    source: "https://www.justice.gov/opa/pr/jetblue-abandons-unlawful-merger-spirit-airlines",
  },
  {
    id: "raytheon-utc",
    acquirer: "Raytheon Company",
    target: "United Technologies",
    valueUsdB: 121,
    announced: "2019-06-09",
    resolved: "2020-04-03",
    sector: "Industrials",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All stock",
    rationale:
      "A merger of equals balancing Raytheon's defence franchise against UTC's commercial aerospace exposure, with the stated aim of smoothing the defence-budget cycle.",
    outcome:
      "Structured as an all-stock merger with no premium and no cash, conditioned on UTC first spinning off Otis and Carrier. Closed into the depth of the pandemic — the commercial-aerospace half of the hedge collapsed within weeks of completion.",
    source: "https://www.rtx.com/news/news-center/2020/04/03/raytheon-company-and-united-technologies-complete-merger-of-equals-transaction",
  },
  {
    id: "bayer-monsanto",
    acquirer: "Bayer",
    target: "Monsanto",
    valueUsdB: 63,
    announced: "2016-09-14",
    resolved: "2018-06-07",
    sector: "Materials",
    dealType: "Horizontal",
    status: "Completed",
    consideration: "All cash",
    premiumPct: 44,
    rationale:
      "Combine crop protection chemicals with seeds and traits to build an integrated agricultural platform, in step with the Dow–DuPont and ChemChina–Syngenta consolidation wave.",
    outcome:
      "The reference case for inherited liability. Cleared after roughly $9bn of divestitures to BASF, but Bayer immediately absorbed the Roundup glyphosate litigation — tens of thousands of claims and well over $10bn in settlements — and its market capitalisation fell below the purchase price.",
    source: "https://www.bayer.com/en/media/bayer-closes-monsanto-acquisition",
  },
];

/* ---------------------------------- queries --------------------------------- */

export function getDeal(id: string): Deal | undefined {
  return deals.find((d) => d.id === id);
}

export function announcedYear(deal: Deal): number {
  return Number(deal.announced.slice(0, 4));
}

export type SortKey = "value-desc" | "value-asc" | "recent" | "oldest" | "premium-desc";

export type FilterOptions = {
  sector?: Sector | "All";
  dealType?: DealType | "All";
  status?: DealStatus | "All";
  year?: number | "All";
  query?: string;
  sort?: SortKey;
};

export function filterDeals({
  sector = "All",
  dealType = "All",
  status = "All",
  year = "All",
  query = "",
  sort = "value-desc",
}: FilterOptions = {}): Deal[] {
  const q = query.trim().toLowerCase();

  const matched = deals.filter((deal) => {
    if (sector !== "All" && deal.sector !== sector) return false;
    if (dealType !== "All" && deal.dealType !== dealType) return false;
    if (status !== "All" && deal.status !== status) return false;
    if (year !== "All" && announcedYear(deal) !== year) return false;
    if (q) {
      const haystack = `${deal.acquirer} ${deal.target} ${deal.sector} ${deal.dealType}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const sorters: Record<SortKey, (a: Deal, b: Deal) => number> = {
    "value-desc": (a, b) => b.valueUsdB - a.valueUsdB,
    "value-asc": (a, b) => a.valueUsdB - b.valueUsdB,
    recent: (a, b) => b.announced.localeCompare(a.announced),
    oldest: (a, b) => a.announced.localeCompare(b.announced),
    "premium-desc": (a, b) => (b.premiumPct ?? -1) - (a.premiumPct ?? -1),
  };

  return [...matched].sort(sorters[sort]);
}

export const sectors: Sector[] = [...new Set(deals.map((d) => d.sector))].sort();
export const dealTypes: DealType[] = [...new Set(deals.map((d) => d.dealType))].sort();
export const statuses: DealStatus[] = [...new Set(deals.map((d) => d.status))].sort();
export const years: number[] = [...new Set(deals.map(announcedYear))].sort((a, b) => b - a);

/** Aggregate announced deal value per announcement year, oldest first. */
export function valueByYear(subset: Deal[] = deals) {
  const totals = new Map<number, { valueUsdB: number; count: number }>();
  for (const deal of subset) {
    const year = announcedYear(deal);
    const entry = totals.get(year) ?? { valueUsdB: 0, count: 0 };
    entry.valueUsdB += deal.valueUsdB;
    entry.count += 1;
    totals.set(year, entry);
  }
  // Fill gap years so the time axis stays evenly spaced.
  const all = [...totals.keys()];
  const out: { year: number; valueUsdB: number; count: number }[] = [];
  for (let y = Math.min(...all); y <= Math.max(...all); y++) {
    const entry = totals.get(y) ?? { valueUsdB: 0, count: 0 };
    out.push({ year: y, ...entry });
  }
  return out;
}

/** Aggregate announced deal value per sector, largest first. */
export function valueBySector(subset: Deal[] = deals) {
  const totals = new Map<Sector, { valueUsdB: number; count: number }>();
  for (const deal of subset) {
    const entry = totals.get(deal.sector) ?? { valueUsdB: 0, count: 0 };
    entry.valueUsdB += deal.valueUsdB;
    entry.count += 1;
    totals.set(deal.sector, entry);
  }
  return [...totals.entries()]
    .map(([sector, v]) => ({ sector, ...v }))
    .sort((a, b) => b.valueUsdB - a.valueUsdB);
}

export function summarise(subset: Deal[] = deals) {
  const totalValue = subset.reduce((sum, d) => sum + d.valueUsdB, 0);
  const premiums = subset.flatMap((d) => (d.premiumPct == null ? [] : [d.premiumPct]));
  const completed = subset.filter((d) => d.status === "Completed").length;
  const resolvedCount = subset.filter((d) => d.status !== "Pending").length;

  return {
    count: subset.length,
    totalValueUsdB: totalValue,
    medianPremiumPct: median(premiums),
    /** Share of resolved deals that actually closed. */
    completionRatePct: resolvedCount === 0 ? null : (completed / resolvedCount) * 100,
    terminated: subset.filter((d) => d.status === "Terminated").length,
  };
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/* --------------------------------- formatting -------------------------------- */

export function formatUsdB(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}T`;
  return `$${value.toFixed(value < 100 ? 1 : 0)}B`;
}

export function formatPct(value: number | null, digits = 0): string {
  if (value == null) return "n/a";
  return `${value.toFixed(digits)}%`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ][m - 1];
  return `${d} ${month} ${y}`;
}

/** Calendar months between announcement and resolution. */
export function monthsToResolve(deal: Deal): number | null {
  if (!deal.resolved) return null;
  const [ay, am] = deal.announced.split("-").map(Number);
  const [ry, rm] = deal.resolved.split("-").map(Number);
  return (ry - ay) * 12 + (rm - am);
}
