# Cresta Candidate Campaign Audit

**Audit date:** July 13, 2026  
**Repository:** `russelldudek/Cresta`  
**Audited campaign build:** `395c494af98dea2bd52bab2848f373b7da72858a`  
**Campaign state:** Published to `main`; GitHub Pages deployment verification pending

## Final results

| Contract | Result | Evidence |
|---|---|---|
| Public manifest | Pass | 50 tracked files published; all six HTML routes, five PDFs, source package, local fonts, tests, generator, audit tooling, and Pages workflow present. |
| Factual integrity | Pass | Candidate claims remain inside verified career evidence; company claims map to the public source register. |
| Brand fidelity | Pass | Official Cresta logo; Wave, Light Blue, Deep Sea, Dusk, Cool Neutral, and Foam tokens; local DM Sans, Inter, and DM Mono files with licenses. |
| Candidate qualifier | Pass | Every route identifies the work as an independent candidate vision or working instrument. |
| Interaction | Pass | Three scenarios, weak-condition repair, diagnosis update, phase-change status, keyboard tab movement, and live-region text verified. |
| Responsive layout | Pass | 1440×1000, 1280×800, 820×1180, and 390×844 have no horizontal overflow. |
| Reduced motion | Pass | Looping packets and pulses are suppressed and transitions collapse under the user preference. |
| Internal links | Pass | Every local HTML target and visible PDF download resolves in the audited tree. |
| Résumé | Pass | Exactly 2 US Letter pages; contact values and selectable text verified. |
| Cover letter | Pass | Exactly 1 US Letter page; contact values and selectable text verified. |
| Interview brief | Pass | Exactly 4 US Letter pages with sources, mandate, decision rights, objection, and executive questions. |
| First 90 days | Pass | Exactly 3 US Letter pages; all recommendations are framed as hypotheses for discovery. |
| Activation Review | Pass | Exactly 1 US Letter page with Outcome, Readiness, Adoption, Evidence, Ownership, disposition, and follow-up notes. |
| PDF rendering | Pass | All 11 pages visually inspected; no clipping, footer collisions, missing roles, or broken logos. Fonts are embedded and text remains selectable. |
| Candidate-facing confidentiality | Pass | Case-insensitive repository, source, filename, PDF text, and PDF metadata scan returned zero restricted internal-label matches. |
| Remote `main` | Pass | Head and publication commit verified through GitHub; representative HTML, workflow, résumé PDF, and cover-letter PDF blobs fetched from `main`. |
| Live Pages route | Pending | The deployment workflow is committed, but the available execution surfaces could not verify the push-triggered run or open the live domain. |

## Automated evidence

`npm test` completed with 14 passing tests and no failures. `npm run audit` completed with 8 passing gates and no failures. The deterministic PDF generator produced these page counts:

- Role-aligned résumé: 2
- Cover letter: 1
- Interview thesis brief: 4
- First 90 days: 3
- Activation Review: 1

## Publication note

The complete audited campaign is present on public `main`. To close the remaining Pages gate, verify **Repository Settings → Pages → Source: GitHub Actions**, then confirm the **Deploy candidate vision to Pages** workflow completes successfully for the audited head. Until that external check is observed, the GitHub Pages target is not classified as live.
