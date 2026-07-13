export const PDF_EXPECTATIONS = Object.freeze({
  'docs/russell-dudek-cresta-resume.pdf': 2,
  'docs/russell-dudek-cresta-cover-letter.pdf': 1,
  'docs/russell-dudek-cresta-interview-brief.pdf': 4,
  'docs/russell-dudek-cresta-90-day-plan.pdf': 3,
  'docs/russell-dudek-cresta-activation-review.pdf': 1
});

export function extractLocalTargets(html) {
  const targets = [];
  const attributePattern = /(?:href|src)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(attributePattern)) {
    const target = match[1];
    if (/^(?:[a-z][a-z+.-]*:|#|\/\/)/i.test(target)) continue;
    const cleanTarget = decodeURIComponent(target.split(/[?#]/, 1)[0]);
    if (cleanTarget && !targets.includes(cleanTarget)) targets.push(cleanTarget);
  }
  return targets;
}
