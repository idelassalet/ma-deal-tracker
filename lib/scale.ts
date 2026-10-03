/** Axis helpers — keeps tick labels on clean round numbers. */

const STEPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];

/**
 * Pick a rounded axis maximum and ~4 evenly spaced ticks for a 0-based scale.
 * Returns ticks ascending, so render them reversed for a top-down axis.
 */
export function niceScale(max: number, targetTicks = 4) {
  if (max <= 0) return { max: 1, ticks: [0, 1] };
  const rawStep = max / targetTicks;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step =
    STEPS.map((s) => s * magnitude).find((s) => s >= rawStep) ?? magnitude * 10;
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let t = 0; t <= niceMax + 1e-9; t += step) ticks.push(Number(t.toFixed(10)));
  return { max: niceMax, ticks };
}
