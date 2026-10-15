# Final submission checklist

**Updated:** 15 October 2026 (IST)

Status reflects the evidence currently available. The build and audit results below were reported by Harish as verified; they were not rerun during this documentation-only update. Manual QA is recorded as passed at the overall level per Harish, but individual checks are not marked passed because the specific checks were not provided.

## Security and local validation

- [x] **PASS (reported by Harish)** — Installed Next.js 16.4.1.
- [x] **PASS (reported by Harish)** — `npm run lint`, `npx tsc --noEmit`, and `npm run build` passed.
- [x] **PASS (reported by Harish)** — `npm audit --omit=dev`: zero vulnerabilities.
- [ ] **FAIL (reported by Harish)** — Full `npm audit`: 9 development-dependency findings (7 high, 2 moderate). Review/accept remediation plan before publishing; do not do a major migration without justification.
- [ ] **NEEDS MY ACTION** — Check official Next.js security guidance applicable to 16.4.1 and confirm its patched-version advice before deployment.

## Product QA and evidence

- [x] **PASS (reported by Harish)** — Manual Chrome QA passed overall.
- [ ] **NEEDS MY ACTION** — Provide/record which specific items below were tested; none are individually marked verified in the information supplied for this update:
  - [ ] Dashboard recommendation and explanation.
  - [ ] Feature details and sample-message preview.
  - [ ] Setup wizard, validation, settings, and review screen.
  - [ ] Save as draft and confirm no messages are sent.
  - [ ] Simulated activation and success state.
  - [ ] Dismissal reason, Recommendations list, and bring-back action.
  - [ ] One-time activation failure and retry.
  - [ ] Insights synthetic-data labels.
  - [ ] Mobile layout, overflow, controls, and navigation.
  - [ ] Browser console and network errors.
- [x] **PASS** — Inspected existing screenshot files and contents. Suggested four: `01-dashboard-recommendation.png`, `02-details.png`, `03-configure.png`, `04-success.png`.
- [ ] **NEEDS MY ACTION** — Confirm chosen screenshots match the current build and select the final three or four.
- [ ] **NEEDS MY ACTION** — Verify `solution.md` renders to no more than four A4 pages; finalize name and formatting.
- [ ] **NEEDS MY ACTION** — Run the prepared useful prompts and weak/improved prompt pair; add only real outputs, links/screenshots, and personal reflection to `ai_usage_log.md`.
- [ ] **NEEDS MY ACTION** — Record and review a 3–5 minute Loom after confirming the scenes correspond to QA actually completed.
- [ ] **NEEDS MY ACTION** — Review assumptions and ensure illustrative estimates are not presented as measured outcomes.

## Financial model and external deliverables

- [x] **PASS** — Financial workbook and CSV assumptions were left unchanged.
- [ ] **NEEDS MY ACTION** — Import the workbook into Google Sheets; recalculate and verify formulas, formatting, errors, and key outputs against the CSV.
- [ ] **NEEDS MY ACTION** — Create/finalize the Google Sheet and solution document; set permitted viewer access and test each link signed out.
- [ ] **BLOCKED in this managed workspace / NEEDS MY ACTION locally** — Git index writes are unavailable here. Review and commit intended changes in writable VS Code; do not force them here.
- [ ] **NEEDS MY ACTION** — Push to GitHub and deploy to Vercel only after security review, QA, and your approval.
- [ ] **NEEDS MY ACTION** — Verify every public link signed out and submit the assignment form by 15 October 2026, 11:59 PM IST (confirm the form is still open).
- [x] **PASS** — No financial assumptions changed; no AI outputs fabricated; no ZIP created; no Git push, deployment, publication, or submission performed.

## Important limitations

The app is a local simulation with synthetic data; it does not send messages or activate real campaigns. The workbook does not establish causal retention impact. An overall manual QA pass does not establish any particular flow unless that flow is documented.