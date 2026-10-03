import type { DealStatus } from "@/lib/deals";

/**
 * Status is encoded three ways — glyph, label and color — because the fixed
 * status palette is not CVD-separable on its own (good vs critical is
 * CVD deltaE 4.1). Color never carries the meaning alone.
 */
const config: Record<DealStatus, { glyph: string; color: string; bg: string }> = {
  Completed: { glyph: "✓", color: "var(--status-good)", bg: "rgba(12,163,12,0.12)" },
  Pending: { glyph: "○", color: "var(--status-warning)", bg: "rgba(250,178,25,0.12)" },
  Terminated: { glyph: "✕", color: "var(--status-critical)", bg: "rgba(208,59,59,0.14)" },
};

export function StatusBadge({ status }: { status: DealStatus }) {
  const { glyph, color, bg } = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: bg, color: "var(--ink-primary)" }}
    >
      <span aria-hidden style={{ color }}>{glyph}</span>
      {status}
    </span>
  );
}
