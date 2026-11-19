/**
 * Entry reveal: plays on every full page load (it is server-rendered markup
 * driven by CSS keyframes in globals.css, so it needs no JS, never blocks
 * input and is skipped entirely for reduced-motion users).
 *
 * Motif, "the connection": one node appears, a line is drawn to a second
 * node, then the screen opens along that seam. Client-side navigation reuses
 * the same seam, shorter (app/template.tsx).
 */
export function EntryReveal() {
  return (
    <div className="entry" aria-hidden="true">
      <div className="entry-half" data-side="top" />
      <div className="entry-half" data-side="bottom" />
      <div className="entry-seam">
        <span className="entry-line" />
        <span className="entry-node" data-at="a" />
        <span className="entry-node" data-at="b" />
        <span className="entry-label">Startup Weekend Siliguri · 2027</span>
      </div>
    </div>
  );
}
