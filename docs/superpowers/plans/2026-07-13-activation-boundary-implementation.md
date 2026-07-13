# Activation Boundary Candidate Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and publish Russell Dudek's complete Cresta AI Deployment Manager candidate campaign around the Activation Boundary thesis.

**Architecture:** A dependency-light static GitHub Pages site uses semantic HTML, shared CSS, and a small vanilla JavaScript scenario model. Printable artifact routes share a document shell and deterministic print styles; Playwright generates PDFs and validates interaction, responsive behavior, reduced motion, overflow, links, and page counts.

**Tech Stack:** HTML5, CSS custom properties, vanilla ES modules, Node.js 24, `node:test`, Playwright 1.61, PDF-Lib 1.17, Poppler `pdfinfo`/`pdftotext`, GitHub Pages.

## Global Constraints

- Public surfaces must describe an `Independent candidate vision by Russell Dudek` and must never imply employment by Cresta.
- The official Cresta logo must appear above the fold, unmodified and locally committed.
- Brand tokens must include Wave `#205AE3`, Light Blue `#A8C5FF`, Deep Sea `#25252A`, Dusk `#3D3D47`, Cool Neutral `#F4F6F9`, and Foam `#EBF0F5`.
- Headings use DM Sans, body copy uses Inter, and technical labels use DM Mono through licensed web delivery with local fallbacks.
- The public thesis is `Go-live is a date. Value is an operating state.`
- The four activation conditions are Outcome, Readiness, Adoption, and Evidence; Ownership binds them.
- The site must not reuse a dispatch queue, stage rail, orbit, control room, ledger, contour envelope, or horizontal journey fingerprint.
- Candidate claims must remain inside the verified evidence in the approved specification.
- Recommendations about Cresta's internal process must be labeled as hypotheses for discovery.
- Resume output is exactly two US Letter pages; cover letter output is exactly one US Letter page.
- Every printable route exposes a visible working PDF download.
- Resume and cover letter expose reciprocal web navigation that is hidden in print.
- All animation has a complete `prefers-reduced-motion: reduce` treatment.
- Public filenames, source, metadata, documentation, commits, and PDFs must return zero case-insensitive matches for the private orchestration name.

---

## File map

- `index.html`: candidate vision narrative and Activation Boundary UI.
- `resume.html`: exactly two-page role-aligned resume source.
- `cover-letter.html`: exactly one-page cover letter source.
- `interview-brief.html`: mandate, tensions, stakeholders, objection, questions, and source notes.
- `90-day-plan.html`: three-horizon entry plan.
- `activation-review.html`: one-page interview scorecard.
- `assets/brand/cresta-logo.svg`: official locally committed Cresta identity.
- `assets/brand/brand-tokens.css`: source-derived brand variables.
- `assets/css/site.css`: site composition, responsive behavior, and motion.
- `assets/css/documents.css`: document screen, mobile, and print geometry.
- `assets/js/activation-model.js`: immutable scenarios and pure scoring functions.
- `assets/js/site.js`: DOM binding, accessible scenario controls, and state rendering.
- `brand-intelligence.md`: official sources, asset provenance, typography, color, and usage decisions.
- `sources.md`: public facts and candidate evidence boundaries.
- `scripts/static-server.mjs`: local HTTP server used by generation and QA.
- `scripts/generate-pdfs.mjs`: deterministic PDF generation.
- `scripts/audit-campaign.mjs`: manifest, content, link, confidentiality, PDF, and page-count audit.
- `tests/activation-model.test.mjs`: pure scenario-model tests.
- `tests/content-contract.test.mjs`: route, claims, brand, contact, and navigation checks.
- `tests/browser-contract.test.mjs`: responsive, keyboard, reduced-motion, and overflow checks.
- `docs/*.pdf`: generated printable artifacts.
- `audit/campaign-audit.md`: final neutral audit record.
- `README.md`: neutral candidate-campaign overview and public links.
- `.github/workflows/pages.yml`: static GitHub Pages deployment.

---

### Task 1: Brand and source package

**Files:**
- Create: `assets/brand/cresta-logo.svg`
- Create: `assets/brand/brand-tokens.css`
- Create: `brand-intelligence.md`
- Create: `sources.md`
- Create: `tests/content-contract.test.mjs`

**Interfaces:**
- Consumes: approved design specification and authoritative Cresta URLs.
- Produces: CSS variables under `:root`, local logo path `/assets/brand/cresta-logo.svg`, and a shared source ledger.

- [ ] **Step 1: Write the failing brand contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('brand package contains official identity and source-derived tokens', async () => {
  const [logo, tokens, intelligence] = await Promise.all([
    readFile('assets/brand/cresta-logo.svg', 'utf8'),
    readFile('assets/brand/brand-tokens.css', 'utf8'),
    readFile('brand-intelligence.md', 'utf8')
  ]);
  assert.match(logo, /<svg/i);
  for (const value of ['#205AE3', '#A8C5FF', '#25252A', '#3D3D47', '#F4F6F9', '#EBF0F5']) {
    assert.match(tokens.toUpperCase(), new RegExp(value.toUpperCase()));
  }
  assert.match(intelligence, /cdn\.prod\.website-files\.com/);
  assert.match(intelligence, /Independent candidate vision/i);
});
```

- [ ] **Step 2: Run the test and verify missing-file failure**

Run: `node --test tests/content-contract.test.mjs`  
Expected: FAIL with `ENOENT` for `assets/brand/cresta-logo.svg`.

- [ ] **Step 3: Add the official logo, tokens, and source documentation**

Use the official asset URL:

```text
https://cdn.prod.website-files.com/67fe49bf21b9f9d5b910d3c9/68653f17c341bd5245e35bb7_CRESTA-logo.svg
```

Define the token interface exactly:

```css
:root {
  --cresta-wave: #205AE3;
  --cresta-light-blue: #A8C5FF;
  --cresta-deep-sea: #25252A;
  --cresta-dusk: #3D3D47;
  --cresta-cool-neutral: #F4F6F9;
  --cresta-foam: #EBF0F5;
  --cresta-white: #FFFFFF;
  --cresta-font-heading: "DM Sans", Arial, sans-serif;
  --cresta-font-body: "Inter", Arial, sans-serif;
  --cresta-font-mono: "DM Mono", ui-monospace, monospace;
}
```

Document the exact logo URL, official site CSS URL, public research URLs, intended logo use, typography delivery, candidate qualifier, and non-impersonation rule in `brand-intelligence.md`. Document every company claim and candidate claim boundary in `sources.md`.

- [ ] **Step 4: Run the brand contract test**

Run: `node --test tests/content-contract.test.mjs`  
Expected: PASS.

- [ ] **Step 5: Commit the brand package**

```bash
git add assets/brand brand-intelligence.md sources.md tests/content-contract.test.mjs
git commit -m "Add Cresta brand and source package"
```

---

### Task 2: Activation scenario model

**Files:**
- Create: `assets/js/activation-model.js`
- Create: `tests/activation-model.test.mjs`

**Interfaces:**
- Consumes: scenario id string and optional condition id.
- Produces: `SCENARIOS`, `getScenario(id)`, `activateCondition(scenario, conditionId)`, and `getActivationState(scenario)`.

- [ ] **Step 1: Write failing pure-model tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENARIOS, getScenario, activateCondition, getActivationState } from '../assets/js/activation-model.js';

test('exposes three role-relevant scenarios', () => {
  assert.deepEqual(Object.keys(SCENARIOS), ['ai-agent', 'agent-assist', 'conversation-intelligence']);
});

test('unknown scenario safely resolves to AI Agent', () => {
  assert.equal(getScenario('missing').id, 'ai-agent');
});

test('strengthening the weak condition realizes the outcome', () => {
  const scenario = getScenario('agent-assist');
  assert.equal(getActivationState(scenario).status, 'stalled');
  const activated = activateCondition(scenario, scenario.weakCondition);
  assert.equal(getActivationState(activated).status, 'realized');
});
```

- [ ] **Step 2: Run the tests and verify module-not-found failure**

Run: `node --test tests/activation-model.test.mjs`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Implement the immutable model**

Create three frozen scenarios. Each scenario must define `id`, `label`, `weakCondition`, four numeric `conditions` from 0 to 100, `stalledDiagnosis`, `realizedDiagnosis`, `nextDecision`, `successSignal`, and `context`. `activateCondition` returns a new frozen object with the selected condition raised to 90. `getActivationState` returns `realized` only when every condition is at least 75.

```js
export function getActivationState(scenario) {
  const floor = Math.min(...Object.values(scenario.conditions));
  return Object.freeze({
    score: Math.round(Object.values(scenario.conditions).reduce((sum, value) => sum + value, 0) / 4),
    floor,
    status: floor >= 75 ? 'realized' : 'stalled'
  });
}
```

- [ ] **Step 4: Run the model tests**

Run: `node --test tests/activation-model.test.mjs`  
Expected: 3 tests PASS.

- [ ] **Step 5: Commit the scenario model**

```bash
git add assets/js/activation-model.js tests/activation-model.test.mjs
git commit -m "Add Activation Boundary scenario model"
```

---

### Task 3: Candidate vision site and interaction

**Files:**
- Create: `index.html`
- Create: `assets/css/site.css`
- Create: `assets/js/site.js`
- Modify: `tests/content-contract.test.mjs`

**Interfaces:**
- Consumes: `getScenario`, `activateCondition`, and `getActivationState` from `activation-model.js`.
- Produces: buttons with `[data-scenario]`, controls with `[data-condition]`, boundary root `#activation-boundary`, diagnosis `#activation-diagnosis`, and status live region `#activation-status`.

- [ ] **Step 1: Extend the content test with the site contract**

```js
test('candidate vision exposes identity, thesis, interaction, evidence, and artifacts', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /assets\/brand\/cresta-logo\.svg/);
  assert.match(html, /Independent candidate vision by Russell Dudek/);
  assert.match(html, /Go-live is a date\. Value is an operating state\./);
  for (const id of ['activation-boundary', 'activation-diagnosis', 'activation-status']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  for (const route of ['resume.html', 'cover-letter.html', 'interview-brief.html', '90-day-plan.html', 'activation-review.html']) {
    assert.match(html, new RegExp(route.replace('.', '\\.')));
  }
});
```

- [ ] **Step 2: Run the content test and verify `index.html` failure**

Run: `node --test tests/content-contract.test.mjs`  
Expected: FAIL with `ENOENT` for `index.html`.

- [ ] **Step 3: Build the full semantic narrative**

Create `index.html` with the official employer lockup, thesis, interactive boundary, company moment, five tensions, four-condition operating model, annotated evidence trail, 90-day horizons, hard objection, and interview workspace. Include authoritative source links and mark process recommendations as hypotheses for discovery.

Bind controls in `site.js` with this public initializer:

```js
export function initializeActivationBoundary(root = document) {
  const boundary = root.querySelector('#activation-boundary');
  if (!boundary) return;
  let active = getScenario('ai-agent');
  const render = () => renderBoundary(root, active);
  root.querySelectorAll('[data-scenario]').forEach((button) => {
    button.addEventListener('click', () => {
      active = getScenario(button.dataset.scenario);
      render();
    });
  });
  root.querySelectorAll('[data-condition]').forEach((button) => {
    button.addEventListener('click', () => {
      active = activateCondition(active, button.dataset.condition);
      render();
    });
  });
  render();
}
```

Use an asymmetric field composition, a central translucent boundary, a CSS/SVG packet trail, strong page-level pacing, and no repeated generic card grid.

- [ ] **Step 4: Run unit and content tests**

Run: `node --test tests/*.test.mjs`  
Expected: all current tests PASS.

- [ ] **Step 5: Commit the candidate vision**

```bash
git add index.html assets/css/site.css assets/js/site.js tests/content-contract.test.mjs
git commit -m "Build the Cresta Activation Boundary vision"
```

---

### Task 4: Resume and cover letter

**Files:**
- Create: `assets/css/documents.css`
- Create: `resume.html`
- Create: `cover-letter.html`
- Modify: `tests/content-contract.test.mjs`

**Interfaces:**
- Consumes: brand tokens and verified contact/evidence values.
- Produces: `.document-sheet`, `.resume-page`, `.cover-page`, visible `.download-pdf`, and `.document-switch` controls.

- [ ] **Step 1: Add document contract tests**

```js
test('resume and cover letter preserve contact and reciprocal navigation', async () => {
  const [resume, cover] = await Promise.all([
    readFile('resume.html', 'utf8'),
    readFile('cover-letter.html', 'utf8')
  ]);
  for (const html of [resume, cover]) {
    for (const contact of ['412.287.8640', 'russelldudek@gmail.com', 'linkedin.com/in/russelldudek', 'Pittsburgh, Pennsylvania']) {
      assert.match(html, new RegExp(contact.replaceAll('.', '\\.')));
    }
    assert.match(html, /class=["'][^"']*download-pdf/);
  }
  assert.equal((resume.match(/class=["'][^"']*resume-page/g) || []).length, 2);
  assert.match(resume, /View Cover Letter/);
  assert.match(cover, /View Resume/);
});
```

- [ ] **Step 2: Run the test and verify missing-document failure**

Run: `node --test tests/content-contract.test.mjs`  
Expected: FAIL with `ENOENT` for `resume.html`.

- [ ] **Step 3: Build the two-page resume**

Page one contains the role thesis, deployment capabilities, and Vape-Jet, DudeWorth, and Amazon evidence. Page two contains Compunetics, Cardinal Building Products, ZeusVu, education, credentials, and technical toolkit. Repeat candidate name and actionable contact information on page two. Use complete modules so page one finishes within the bottom composition zone without filler.

- [ ] **Step 4: Build the one-page cover letter and shared print CSS**

The letter opens with the go-live versus operating-state contradiction, connects Cresta's current moment to verified evidence, addresses the CCaaS-tenure objection, and closes with the Activation Boundary value proposition. Define exact print geometry:

```css
@page { size: Letter; margin: 0; }
@media print {
  .document-toolbar, .document-switch { display: none !important; }
  .document-sheet { margin: 0; box-shadow: none; }
  .resume-page, .cover-page { width: 8.5in; height: 11in; break-after: page; overflow: hidden; }
  .resume-page:last-child, .cover-page { break-after: auto; }
}
```

- [ ] **Step 5: Run content tests and commit**

Run: `node --test tests/*.test.mjs`  
Expected: all tests PASS.

```bash
git add assets/css/documents.css resume.html cover-letter.html tests/content-contract.test.mjs
git commit -m "Add role-aligned resume and cover letter"
```

---

### Task 5: Interview brief, entry plan, and activation review

**Files:**
- Create: `interview-brief.html`
- Create: `90-day-plan.html`
- Create: `activation-review.html`
- Modify: `tests/content-contract.test.mjs`

**Interfaces:**
- Consumes: shared document shell, brand tokens, source ledger, and approved role intelligence.
- Produces: printable routes with matching PDF download targets in `docs/`.

- [ ] **Step 1: Add supporting-artifact tests**

```js
test('supporting artifacts expose required argument and real PDF targets', async () => {
  const contracts = {
    'interview-brief.html': [/Actual mandate/i, /Decision rights/i, /Hard objection/i, /Executive questions/i],
    '90-day-plan.html': [/Days 1.?30/i, /Days 31.?60/i, /Days 61.?90/i, /Hypotheses for discovery/i],
    'activation-review.html': [/Outcome/i, /Readiness/i, /Adoption/i, /Evidence/i, /Ownership/i]
  };
  for (const [path, patterns] of Object.entries(contracts)) {
    const html = await readFile(path, 'utf8');
    for (const pattern of patterns) assert.match(html, pattern);
    assert.match(html, /docs\/[^"']+\.pdf/);
  }
});
```

- [ ] **Step 2: Run the test and verify missing-artifact failure**

Run: `node --test tests/content-contract.test.mjs`  
Expected: FAIL with `ENOENT` for `interview-brief.html`.

- [ ] **Step 3: Build the interview brief**

Use a consulting-report layout with documented company moment, actual mandate, five tensions, stakeholders, decision rights, success measures, activation model, objection, evidence response, and eight executive questions. Put citations in a compact source note and label internal-process ideas as hypotheses.

- [ ] **Step 4: Build the 90-day plan and scorecard**

Create three complete 30-day horizons with learning questions, actions, outputs, and restraint statements. Create a one-page scorecard with fields for outcome baseline, readiness, adoption owner, evidence/release criteria, decision required, optimization trigger, customer confidence, and scale readiness.

- [ ] **Step 5: Run tests and commit**

Run: `node --test tests/*.test.mjs`  
Expected: all tests PASS.

```bash
git add interview-brief.html 90-day-plan.html activation-review.html tests/content-contract.test.mjs
git commit -m "Add Cresta interview working materials"
```

---

### Task 6: PDF generation and deterministic local server

**Files:**
- Create: `scripts/static-server.mjs`
- Create: `scripts/generate-pdfs.mjs`
- Create: `package.json`
- Create: `docs/.gitkeep`

**Interfaces:**
- Consumes: route-to-output map and repository root.
- Produces: `startServer({ port }) -> { origin, close }` and five committed PDFs.

- [ ] **Step 1: Create package scripts**

```json
{
  "name": "cresta-candidate-vision",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "pdf": "node scripts/generate-pdfs.mjs",
    "audit": "node scripts/audit-campaign.mjs"
  }
}
```

- [ ] **Step 2: Implement a safe static server**

Resolve URL paths under `process.cwd()`, map `/` to `index.html`, reject paths outside the root with 403, return 404 for missing files, and set MIME types for HTML, CSS, JavaScript, SVG, and PDF. `close` must await `server.close()`.

- [ ] **Step 3: Implement PDF generation**

Use this route map:

```js
const artifacts = [
  ['resume.html', 'docs/russell-dudek-cresta-resume.pdf'],
  ['cover-letter.html', 'docs/russell-dudek-cresta-cover-letter.pdf'],
  ['interview-brief.html', 'docs/russell-dudek-cresta-interview-brief.pdf'],
  ['90-day-plan.html', 'docs/russell-dudek-cresta-90-day-plan.pdf'],
  ['activation-review.html', 'docs/russell-dudek-cresta-activation-review.pdf']
];
```

For each route, load with `waitUntil: 'networkidle'`, emulate `print`, and call `page.pdf({ path, format: 'Letter', printBackground: true, preferCSSPageSize: true })`. Close the browser and server in `finally`.

- [ ] **Step 4: Generate PDFs**

Run: `npm run pdf`  
Expected: five `Wrote docs/*.pdf` lines and exit 0.

- [ ] **Step 5: Inspect page counts**

Run: `pdfinfo docs/russell-dudek-cresta-resume.pdf | rg '^Pages:' && pdfinfo docs/russell-dudek-cresta-cover-letter.pdf | rg '^Pages:'`  
Expected: resume `Pages: 2`; cover letter `Pages: 1`.

- [ ] **Step 6: Commit generator and PDFs**

```bash
git add package.json scripts docs
git commit -m "Generate Cresta campaign PDF artifacts"
```

---

### Task 7: Browser and campaign audits

**Files:**
- Create: `tests/browser-contract.test.mjs`
- Create: `scripts/audit-campaign.mjs`
- Modify: `assets/css/site.css`
- Modify: `assets/css/documents.css`

**Interfaces:**
- Consumes: local server, route manifest, PDFs, and browser contexts.
- Produces: passing browser tests and an audit process that exits nonzero on contract failure.

- [ ] **Step 1: Write responsive and interaction tests**

For viewports 1440×1000, 1280×800, 820×1180, and 390×844, assert that `document.documentElement.scrollWidth <= innerWidth + 1`. Test all three scenario buttons, one weak-condition repair, keyboard activation with Enter, and visible diagnosis updates. In a reduced-motion context, assert computed animation duration is `0s` or animation name is `none` for `.signal-packet`.

```js
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
assert.ok(overflow <= 1, `horizontal overflow: ${overflow}px`);
```

- [ ] **Step 2: Run browser tests and capture failures**

Run: `node --test tests/browser-contract.test.mjs`  
Expected: tests identify any responsive, keyboard, or reduced-motion defect before final CSS refinement.

- [ ] **Step 3: Fix only observed contract failures**

Adjust breakpoint composition, boundary grid stacking, document preview height, focus treatment, and reduced-motion CSS based on test output. Do not introduce unrelated redesign.

- [ ] **Step 4: Implement the full campaign audit**

The audit must verify:

- required manifest files exist;
- every internal HTML link resolves;
- every PDF link resolves;
- contact values exist in resume and cover letter HTML;
- `pdfinfo` page counts are resume 2 and cover letter 1;
- `pdftotext` output includes candidate contact values;
- PDF metadata contains no forbidden private name;
- repository filenames and public text contain zero forbidden private-name matches;
- every route has a candidate qualifier and no official-publication implication;
- every source fact is represented in `sources.md`.

- [ ] **Step 5: Run the complete test and audit suite**

Run: `npm test && npm run pdf && npm run audit`  
Expected: all tests PASS, five PDFs regenerate, and audit prints `Campaign audit passed`.

- [ ] **Step 6: Commit QA work**

```bash
git add tests scripts assets/css docs
git commit -m "Validate Cresta campaign interaction and print contracts"
```

---

### Task 8: Visual inspection and audit record

**Files:**
- Create: `audit/campaign-audit.md`
- Create: `audit/screenshots/.gitkeep`
- Modify: affected HTML/CSS/PDF files when visual findings require repair.

**Interfaces:**
- Consumes: browser screenshots and rendered PDF page images.
- Produces: a neutral audit record with exact checks, findings, repairs, and final status.

- [ ] **Step 1: Capture route screenshots**

Use Playwright to capture the site at desktop, laptop, tablet, mobile, and reduced-motion settings, plus full-page images of every document route. Store screenshots temporarily outside the public repository unless a specific screenshot materially supports the audit.

- [ ] **Step 2: Render and inspect every PDF page**

Run `pdftoppm -png -r 130 docs/<artifact>.pdf /tmp/<artifact>` for all five PDFs. Inspect all pages for clipping, orphans, footer collisions, tiny type, unbalanced page-one resume composition, and inconsistent brand treatment.

- [ ] **Step 3: Repair findings and regenerate**

Make targeted HTML/CSS edits, rerun `npm run pdf`, and repeat the affected browser and PDF inspection until no material finding remains.

- [ ] **Step 4: Record the final local audit**

Write `audit/campaign-audit.md` with manifest, factual integrity, brand fidelity, interaction, accessibility, responsive, reduced motion, document, PDF, contact, navigation, and confidentiality results. Classify the campaign as `building` until `main` and live deployment are verified.

- [ ] **Step 5: Commit visual refinements and audit**

```bash
git add index.html resume.html cover-letter.html interview-brief.html 90-day-plan.html activation-review.html assets docs audit
git commit -m "Refine and audit Cresta candidate materials"
```

---

### Task 9: Publication and GitHub Pages

**Files:**
- Create: `.github/workflows/pages.yml`
- Create: `README.md`
- Modify: `audit/campaign-audit.md`
- Modify: HTML contact blocks with verified campaign URL.

**Interfaces:**
- Consumes: complete audited local tree.
- Produces: complete public `main`, captured head SHA, and verifiable GitHub Pages URL.

- [ ] **Step 1: Add the Pages workflow**

```yaml
name: Deploy candidate vision
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Add the campaign URL and neutral README**

Use `https://russelldudek.github.io/Cresta/` in HTML and PDFs only after the publication path is verified. The README describes an independent candidate vision, routes, accessibility, PDFs, and source grounding without exposing internal process names.

- [ ] **Step 3: Re-run all local gates**

Run: `npm test && npm run pdf && npm run audit`  
Expected: PASS with exact page counts and zero confidentiality matches.

- [ ] **Step 4: Publish the complete tree to `main`**

```bash
git add .
git commit -m "Publish complete Cresta candidate vision"
git push origin main
```

- [ ] **Step 5: Verify `main` and Pages**

Fetch the complete manifest from `main`, capture the head SHA, verify all expected files and PDFs, inspect the workflow result, and compare live HTML bytes or stable content markers to the audited head. If Pages administration remains unavailable, leave campaign state `blocked` and record the exact manual enablement required without claiming completion.

---

### Task 10: Canonical alignment and portfolio learning

**Files:**
- Modify: public campaign files if refreshed contracts expose drift.
- Modify in private source-of-truth repository: relevant case memory, portfolio index, pattern observations, and anti-clone ledger only when supported.

**Interfaces:**
- Consumes: latest private campaign contracts, final public `main` manifest, head SHA, and live result.
- Produces: aligned public campaign, final completion classification, and evidence-supported portfolio memory.

- [ ] **Step 1: Re-read the latest canonical files**

Read current `main` versions of the campaign skill, all required references, candidate evidence, portfolio index, pattern ledger, anti-clone ledger, and relevant cases.

- [ ] **Step 2: Compare the actual public campaign to every current contract**

Check brand package, visible company identity, candidate qualifier, artifact manifest, contact blocks, reciprocal links, PDF downloads, print page counts, page-one balance, interaction, reduced motion, responsive behavior, source grounding, confidentiality, publication, and audit evidence.

- [ ] **Step 3: Fix drift and republish when necessary**

Apply only required corrections, regenerate PDFs, rerun the full audit, push the corrected tree to `main`, and capture the new audited head SHA.

- [ ] **Step 4: Re-ingest the completed campaign**

Record the Activation Boundary's four-condition phase-change model, packet absorption/crossing motion, scenario-repair interaction, approved thesis, source-grounded evidence strategy, and final campaign state. Promote no new reusable principle unless repeated evidence or explicit candidate approval supports it.

- [ ] **Step 5: Produce the final handoff**

Report campaign repository, job posting, audited main head, verified live site when available, brand-fidelity result, candidate-facing confidentiality result, exact resume and cover-letter page counts, and any external publication blocker.
