const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2023-08" -> "Aug 2023"; empty -> "Present" */
export function monthYear(ym: string): string {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return `${months[m - 1]} ${y}`;
}

export function range(start: string, end: string): string {
  return `${monthYear(start)} – ${monthYear(end)}`;
}

/** Short year span for compact timelines: "2023 — now", "2014 — 20" */
export function yearSpan(start: string, end: string): string {
  const s = start.slice(0, 4);
  if (!end) return `${s} — now`;
  const e = end.slice(0, 4);
  return s === e ? s : `${s} — ${e.slice(2)}`;
}

/** Front-matter dates are UTC midnight, so format in UTC or they shift a day west of Greenwich. */
export function postDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
