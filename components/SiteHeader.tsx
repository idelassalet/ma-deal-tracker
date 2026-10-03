import Link from "next/link";

const links = [
  { href: "/", label: "Tracker" },
  { href: "/about", label: "Method & concepts" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-hairline bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight">
            M&amp;A Deal Tracker
          </span>
          <span className="hidden text-xs text-ink-muted sm:inline">
            landmark deals announced 2016–2024
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-sm text-ink-secondary transition-colors hover:bg-surface-raised hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
