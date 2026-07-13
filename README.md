# Cresta AI Deployment — Candidate Vision

An independent candidate vision by Russell Dudek for Cresta's AI Deployment Manager role.

**Thesis:** Go-live is a date. Value is an operating state.

The centerpiece is an interactive Activation Boundary that makes four deployment conditions visible: Outcome, Readiness, Adoption, and Evidence, bound by explicit Ownership. Three scenario modes show how an otherwise capable AI deployment can stall—and what changes when the weakest condition is repaired.

## Campaign materials

- Candidate vision: `index.html`
- Two-page role-aligned résumé: `resume.html`
- One-page cover letter: `cover-letter.html`
- Interview thesis brief: `interview-brief.html`
- Hypothesis-driven first 90 days: `90-day-plan.html`
- One-page Activation Review: `activation-review.html`
- Print-ready PDFs: `docs/`
- Public-source register: `sources.md`
- Brand provenance: `brand-intelligence.md`

## Run and verify

```bash
npm install
npm test
npm run pdfs
FORBIDDEN_PUBLIC_TERM="internal-label" npm run audit
```

The PDF renderer uses a packaged headless Chromium runtime, so generation does not depend on a workstation browser installation. The site itself is static and requires no build step.

## Public links

- [Live candidate vision](https://russelldudek.github.io/Cresta/)
- [AI Deployment Manager job posting](https://job-boards.greenhouse.io/cresta/jobs/5078921008?gh_src=9a5432008us)
- [Russell Dudek on LinkedIn](https://www.linkedin.com/in/russelldudek)

## Disclaimer

This is an independent candidate work sample created from public sources and verified career evidence. It is not an official Cresta site, internal operating process, or statement of Cresta policy.
