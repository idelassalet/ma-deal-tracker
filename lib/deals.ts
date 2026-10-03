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
      "Microsoft wanted Activision's franchises to feed Game Pass and to finally get into mobile gaming, which it had never managed to build on its own. Owning the content makes the subscription service much harder for Sony to copy.",
    outcome:
      "Took 21 months to close. The UK regulator blocked it first and the FTC sued to stop it, so Microsoft sold the cloud streaming rights for Activision games to Ubisoft and refiled. The restructured version cleared in October 2023.",
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
      "Broadcom has been buying enterprise software for years to depend less on chip cycles. VMware came with a big base of corporate customers paying recurring licence fees.",
    outcome:
      "Cleared after about 18 months of reviews. Once it closed, Broadcom moved customers off perpetual licences onto subscriptions and raised prices, which drew complaints from customers and attention from EU regulators. Getting antitrust approval did not stop any of that.",
    source: "https://news.vmware.com/releases/broadcom-completes-vmware-acquisition",
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
      "Nvidia wanted to own the chip architecture behind almost every phone and embedded device, and pair it with its data centre business.",
    outcome:
      "Dropped after 17 months. The FTC sued and UK and EU regulators opened deeper investigations, all worried about the same thing: Arm licenses its designs to Nvidia's competitors, so Nvidia owning Arm could cut them off. SoftBank kept a $1.25bn break fee and listed Arm on Nasdaq instead.",
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
      "AMD added FPGAs to its CPU and GPU range to sell more into data centres, networking and cars, and to compete with Intel across a wider product set.",
    outcome:
      "Announced at $35bn, but AMD paid in its own shares and the stock rose during the review, so it was worth roughly $49bn at closing. A clear example of how an all-stock deal leaves the seller carrying price risk until the deal completes.",
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
      "IBM's legacy services business was shrinking. Red Hat gave it a hybrid cloud platform it could sell to companies running workloads across AWS, Azure and their own data centres.",
    outcome:
      "IBM's largest acquisition, funded mostly with debt, at a 63% premium. Red Hat was left to operate separately so its open source community would not turn on it.",
    source: "https://www.ibm.com/investor/news/ibm-completes-acquisition-of-red-hat",
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
      "Salesforce bought Slack to sit in the middle of how its customers work every day, and to answer Microsoft bundling Teams into Office 365 for free.",
    outcome:
      "Closed in about seven months with no regulatory trouble. The problem was with investors instead: activists argued Salesforce had paid too much for growth, and the company shifted to margin targets and buybacks soon after.",
    source: "https://slack.com/blog/news/salesforce-completes-acquisition-of-slack",
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
      "LinkedIn's professional network and the data behind it could be plugged into Office and Dynamics, and it was not something Microsoft could realistically build itself.",
    outcome:
      "Cleared in under six months after Microsoft gave the EU commitments on interoperability. Usually counted as one of its better deals: LinkedIn revenue grew several times over while it kept operating semi-independently.",
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
      "Nuance's speech recognition was already running in US hospitals for clinical notes, so it gave Microsoft a way into healthcare software rather than just selling cloud capacity.",
    outcome:
      "Cleared quickly in the US; the UK regulator reviewed it for a few months and approved it unconditionally. Nuance's technology became the base for Microsoft's clinical AI products.",
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
      "A sponsor deal, not a strategic one. Citrix threw off steady cash but was barely growing, so Vista and Elliott took it private at $104 a share and merged it with Vista's TIBCO.",
    outcome:
      "The financing is the part worth knowing. The banks committed around $15bn of debt before rates moved, then could not syndicate it and sold at a steep loss. Large LBOs were effectively frozen for about a year afterwards.",
    source: "https://www.cloud.com/news/press-release/2022/vista-equity-partners-and-evergreen-coast-capital-complete-transaction-to-acquire-citrix-and-combine-with-tibco",
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
      "A take-private by a single buyer, funded with his own equity plus about $13bn of debt, on the idea of loosening moderation and shifting revenue from advertising to subscriptions.",
    outcome:
      "The deal certainty case everyone uses. Musk signed without normal due diligence, then tried to walk away over Twitter's spam account numbers. Twitter sued in Delaware for specific performance and he closed on the original terms days before trial.",
    source: "https://www.sec.gov/Archives/edgar/data/1418091/000119312522120461/d310843d8k.htm",
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
      "Vertical deal: put an insurer, a PBM and a pharmacy chain under one roof so CVS controls more of what it costs to treat a patient. Partly defensive, since Amazon was moving into pharmacy.",
    outcome:
      "Approved once CVS agreed to sell Aetna's Medicare Part D business. Unusually, the judge reopened the review after the deal had already closed before finally signing off on the settlement.",
    source: "https://investors.cvshealth.com/news/news-details/2018/CVS-Health-Completes-Acquisition-of-Aetna-Marking-the-Start-of-Transforming-the-Consumer-Health-Experience/default.aspx",
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
      "The same logic as CVS-Aetna from the other side: an insurer buying the biggest independent PBM so the margin on drug pricing stays inside the group.",
    outcome:
      "The DOJ cleared it with no divestitures at all. Within a year the two deals had taken the large independent PBMs out of the market, which is why these two are normally taught together.",
    source: "https://newsroom.thecignagroup.com/Cigna-Completes-Combination-with-Express-Scripts-Establishing-a-Blueprint-to-Transform-the-Health-Care-System",
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
      "Pfizer put its Covid cash into antibody-drug conjugates to refill the oncology pipeline before several products lose patent protection.",
    outcome:
      "Funded with roughly $31bn of new debt. The FTC closed its review without conditions because the two pipelines barely overlapped, which is the usual route through review for big pharma deals.",
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
      "Amgen bought rare disease drugs, mainly Tepezza, which hold their pricing and have no generic competition coming soon.",
    outcome:
      "The FTC sued on a new theory: that Amgen could use rebates on its existing blockbusters to pressure insurers into covering Horizon's drugs. It settled with a consent order banning that conduct rather than blocking the deal.",
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
      "Pioneer's acreage sits next to Exxon's in the Permian, so Exxon more than doubles its production there and can drill it with its own methods. The case rests on cost per barrel, not on buying reserves at any price.",
    outcome:
      "Cleared after the FTC insisted that Pioneer's former CEO not take a seat on the combined board, over messages regulators said amounted to coordinating with OPEC. The remedy went after a person rather than the structure of the deal.",
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
      "Chevron was after Hess's stake in the Stabroek block in Guyana, one of the best oil finds of the last decade, to keep production growing into the 2030s.",
    outcome:
      "Took almost two years, and not because of antitrust. Exxon and CNOOC, Hess's partners in the block, claimed a right of first refusal over the stake. An arbitration panel rejected that in July 2025 and the deal closed days later. Partner consent rights can be a harder gate than regulators.",
    source: "https://www.chevron.com/newsroom/2025/q3/chevron-completes-acquisition-of-hess-corporation",
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
      "LVMH is strong in fashion and leather goods and weaker in jewellery. Tiffany was a well-known brand it thought it could run better.",
    outcome:
      "LVMH tried to get out during the pandemic and Tiffany sued in Delaware. They settled at $131.50 a share instead of $135, cutting around $400m off the price. Rare case of a buyer getting a genuine discount without a pandemic carve-out in the contract.",
    source: "https://www.sec.gov/Archives/edgar/data/98246/000119312521004213/d301758dex991.htm",
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
      "Amazon had spent years failing to crack groceries with AmazonFresh. Whole Foods gave it stores, cold chain logistics and a trusted food brand in one move.",
    outcome:
      "Cleared in ten weeks with no conditions. It is now one of the most cited examples of how relaxed merger review was towards big tech, and fed directly into the antitrust reform debate that followed.",
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
      "The two biggest traditional US supermarket chains combining so they could buy on terms closer to Walmart, Costco and Amazon.",
    outcome:
      "Blocked. Kroger offered to sell 579 stores to C&S Wholesale Grocers, but the courts decided that buyer was too small to replace the competition being lost, and granted injunctions. Albertsons terminated the next day and sued Kroger over how it had run the clearance process. A good example of a remedy package failing.",
    source: "https://www.ftc.gov/news-events/news/press-releases/2024/12/statement-ftc-victory-securing-halt-kroger-albertsons-grocery-merger",
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
      "Disney needed content and control of Hulu to launch Disney+ against Netflix, and was willing to take the hit to earnings to own the customer relationship.",
    outcome:
      "Comcast bid against it, which pushed Disney from $52.4bn up to $71.3bn and forced it to add cash to the offer. It cleared after selling Fox's regional sports networks. Disney later wrote down a lot of the value, so this one usually comes up as overpaying in a contested auction.",
    source: "https://thewaltdisneycompany.com/press-releases/disney-21st-century-fox-acquisition-closing-date/",
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
      "Amazon bought a library of around 4,000 films plus James Bond as content for Prime Video. The return shows up in Prime retention, not in the studio making money on its own.",
    outcome:
      "The EU cleared it unconditionally and the FTC, split internally, let the waiting period expire. Amazon did not get creative control of the Bond franchise at closing and had to negotiate for it separately years later.",
    source: "https://www.aboutamazon.com/news/entertainment/mgm-joins-prime-video-and-amazon-studios",
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
      "AT&T wanted to put its distribution together with HBO, Warner Bros. and Turner so it could sell its own programming, and advertising against its subscriber data.",
    outcome:
      "The DOJ challenged it as a vertical merger and lost at trial and again on appeal. AT&T still spun the business off to Discovery in 2022 for far less than it paid. Winning the antitrust case and making money turned out to be different questions.",
    source: "https://www.sec.gov/Archives/edgar/data/0000732717/000073271718000055/ex99_1.htm",
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
      "Capital One was buying a payments network, not just more card balances. Owning the rails means keeping interchange instead of handing it to Visa and Mastercard.",
    outcome:
      "Needed Federal Reserve and OCC approval on top of antitrust clearance, and attracted a lot of political opposition over concentration in consumer credit. Approved in April 2025 and closed a month later, making Capital One the largest US card issuer by balances.",
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
      "Standard Berkshire logic: put spare cash into an insurer whose float Berkshire can then invest.",
    outcome:
      "Negotiated directly, with no auction and no bank advising Berkshire. Buffett publicly refused to pay the seller's advisory fee out of the price. Cleared without any issues.",
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
      "JetBlue could not grow fast enough on its own, so it tried to buy aircraft, slots and pilots by acquiring Spirit.",
    outcome:
      "Blocked. JetBlue outbid Frontier and then lost in court: the judge accepted that taking Spirit out would remove the ultra-low-cost pressure that holds fares down. JetBlue paid a $69m termination fee and Spirit filed for Chapter 11 later that year.",
    source: "https://www.justice.gov/archives/opa/pr/justice-department-statements-jetblue-terminating-acquisition-spirit-airlines",
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
      "A merger of equals meant to balance Raytheon's defence revenue against UTC's commercial aerospace exposure, so the combined company rides the defence budget cycle less.",
    outcome:
      "All stock, no premium, no cash, and conditional on UTC first spinning off Otis and Carrier. It closed in April 2020, so the commercial aerospace half of the hedge collapsed within weeks of completion.",
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
      "Bayer put crop chemicals together with seeds and traits to build an integrated agriculture business, following Dow-DuPont and ChemChina-Syngenta.",
    outcome:
      "Cleared after around $9bn of divestitures to BASF, but Bayer also inherited the Roundup litigation: tens of thousands of claims and well over $10bn in settlements. Its market value fell below what it paid for Monsanto. The usual example of due diligence on legal liabilities.",
    source: "https://www.bayer.com/media/en-us/bayer-closes-monsanto-acquisition/",
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
