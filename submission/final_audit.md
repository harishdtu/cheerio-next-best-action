# Final submission audit

**Audit date:** 13 October 2026 (IST)  
**Status:** Local package is not ready to submit. The source project and deliverables are present, but runtime checks could not run without dependencies. Public links, genuine AI evidence, a Loom, and final submission still require Harish's actions.

## Deliverables and current status

| Deliverable | Status |
|---|---|
| Next.js prototype (`app/`, `components/`, `lib/`) | Present. Source describes a simulated local prototype; no real messaging or activation. Runtime QA is pending because dependencies are absent. |
| `solution.md` | Present; includes target hypothesis, alternatives, selected features, journey, safeguards, three primary metrics, North Star, causal measurement plan, 90-day plan, and illustrative financial case. Existing document states it rendered to four A4 pages previously; this audit could not reproduce that render. |
| `financial_model.xlsx` | Present; seven sheets and 884 formulas. Structural and cached-value review below. No workbook edits made. |
| `financial_model.csv` | Present as a flattened export; selected Base and scenario outputs reconcile to workbook values at the CSV's displayed precision. |
| `assumptions_and_limitations.md` | Present; correctly labels model inputs as illustrative and documents limitations. Some verification statements describe an earlier pass and were not independently reproduced here. |
| `ai_usage_log.md` | Present as an honest evidence template. It says no prompt runs or evidence have been recorded; mandatory evidence remains incomplete. |
| `prototype_walkthrough.md` | Present with click paths, screenshot descriptions, Loom script, and publishing steps. The document says no public URL exists. |
| Screenshots | Eight PNG files present. Their existence is confirmed; capture provenance and current correspondence to the app were not verified in this pass. |
| `final_submission_checklist.md` | Created in this audit. |
| Git repository | No `.git` directory in the supplied project folder; Git status and history cannot be inspected here. No repository was initialized. |

## Financial model audit

### Checks completed

- Opened the workbook with Python `openpyxl`; found seven sheets: README, Assumptions, Adoption funnel, Cost model, Cohort engine, Revenue and business case, Billing and audit.
- Counted 884 formula cells and found no cached Excel error cells. Formula cells have cached results, but a cache is not proof that the formulas recalculate correctly.
- Reviewed key cross-sheet formulas and workbook scenario labels. Both views use a 12-month horizon and ₹37,000/month fixed operating allocation (₹444,000 over the horizon). The single-cohort case includes only the initial cohort; recurring rollout adds later cohorts and retains the same fixed-cost basis.
- The cohort engine includes each cohort's remaining months and a one-month activation lag. The business case credits retention only to treatment-versus-control incremental activations and sums retained account-months; it does not multiply retained customers by the horizon as if every customer were present for all 12 months.
- Independently recomputed the Base case from the workbook's assumptions: eligible/exposed launch cohort = 5,000 × 40% × 80% = 1,600 accounts; treatment activation rate = 30% × 68% × 63% = 12.852%; control activation = 5%; incremental activations = 125.632. Summing the month-by-month difference in survival at 3.5% versus 5% monthly churn after the one-month lag gives 93.799 incremental retained account-months and −55.107% ROI.
- Independently recomputed recurring Base using the 2% monthly new-eligibility assumption: 110.946 incremental retained account-months and −46.901% ROI. The formula is `(incremental retained account-months × ₹2,500 × 85% gross margin − ₹444,000) / ₹444,000`.
- Break-even is ₹444,000 / (₹2,500 × 85%) = 208.94 incremental retained account-months. The Base scenarios therefore do not break even on fully loaded allocated cost.
- Both sensitivity-grid base-cell check cells in the workbook cache display `OK`.
- Reconciled the CSV's fixed monthly cost, retained account-months, 12-month programme costs, and Conservative/Base/Optimistic ROI outputs for both scenarios to the workbook's cached outputs (rounded to the CSV's displayed precision).
- Fully loaded fixed cost reconciles to ₹6,000 hosting + ₹4,000 analytics/experimentation + ₹25,000 development/maintenance allocation + ₹2,000 other = ₹37,000/month. The ₹25,000 is an allocation, not evidence of incremental cash spend.
- The business case treats retention differences as assumptions, not established causal results. A randomized holdout is still needed to estimate incremental activation and retention impact.

### Not independently verified / limitations

- All scenario output columns and selected CSV outputs reconcile; billing break-even formulas and every sensitivity cell were not independently recalculated in this pass.
- Formula text and sheet references were sampled, not exhaustively parsed. `openpyxl` does not calculate formulas. Cached values alone cannot validate formula integrity or behavior after conversion to Google Sheets.
- Billing options use the same horizon and fixed-cost basis in workbook labels, but their direct-revenue assumptions (upgrade/add-on take rates, no cannibalization, and zero build/support costs) remain illustrative and favor paid options.
- An incremental cash-cost view cannot be responsibly calculated from current evidence. Hosting, tooling, and other costs may or may not be avoidable; the workbook does not establish which expenses are genuinely incremental. Keep the fully loaded view primary and do not call allocations actual cash spending.
- Token prices and FX inputs are explicitly unverified. The AI cost is zero only because the optional AI layer is off.

### What must be true to break even

With the current illustrative 12-month inputs and fully loaded cost, the project needs at least 208.94 incremental retained account-months (about 2.23× the Base single-cohort result or 1.88× the recurring result). That requires a measured combination of sufficient eligible/exposed accounts, incremental activation lift, and a durable retention difference that yields that many account-months, while keeping total cost at or below ₹444,000. These are conditions from the model, not a forecast or a causal claim.

## Prototype and document QA

- Source and package metadata were inspected. `node_modules` is absent, so the app could not be started for the requested interactive, mobile, keyboard, link, console, and browser checks.
- `npm.cmd ci` was attempted but npm failed with `Exit handler never called!`; npm also could not write its log to the user cache. The incomplete `node_modules` directory created by that attempt was removed after verifying it was inside this workspace and had not existed before.
- `npm.cmd run lint` and `npm.cmd run build` were attempted; both stopped because `next` is not installed. `npm.ps1` is also blocked by the current PowerShell execution policy, so use `npm.cmd` in these instructions.
- Type-check, existing tests, browser smoke tests, and document page-count checks were not run. No existing test script is declared in `package.json`.
- No new screenshots were made and no unsupported prototype behavior was claimed.
- README already lists setup (`npm install`), development, lint, type-check (`npx tsc --noEmit`), and production build commands. Clean-checkout behavior remains unverified because dependencies could not be installed and this folder has no Git metadata.

## Git, security, and publishing readiness

- `.gitignore` excludes `node_modules`, `.next`, `out`, `build`, `.vercel`, environment files (except `.env.example`), and `*.pem`. It was tightened in this pass because the original rule excluded only `.env*.local`. No `.env` file appeared in the supplied inventory. This is a filesystem check, not a commit-history secret scan; there is no Git repository to inspect.
- No GitHub commit, Vercel deployment, Google Sheet, Google Doc, Loom, public link, or final form submission was created or verified.
- No ZIP was created because runtime checks and required local verification are incomplete. This preserves the distinct-archive requirement without presenting an unverified package as final.

## Commands and checks executed

- Enumerated project files and read the package metadata, ignore rules, README, and submission documents.
- `git status --short` — unavailable: current folder is not a Git repository.
- Python `openpyxl` workbook inspection — completed; 7 sheets, 884 formulas, 0 cached error cells.
- Independent Base-case cohort and ROI arithmetic — completed; results above.
- Sensitivity base-cell cached checks — both `OK`.
- `npm.cmd run lint` — blocked: `next` command missing because `node_modules` is absent.
- `npm.cmd run build` — blocked: `next` command missing because `node_modules` is absent.
- `npm.cmd ci` — failed inside npm (`Exit handler never called!`); npm could not write its log under the user cache. Partial generated dependencies were removed.
- CSV output reconciliation — completed for selected key outputs and all Conservative/Base/Optimistic ROI rows; values match workbook cached outputs at displayed precision.
- TypeScript type-check, dev server/browser QA, document render/page count — not run.

## Changes made

- Added this audit report and `final_submission_checklist.md`.
- Tightened `.gitignore` to ignore environment files by default while allowing `.env.example`; saved the prior version at `submission/audit_backups/gitignore.before-audit`.
- Did not change the prototype, workbook, CSV, solution, or existing screenshots because no reproducible defect was established in this pass.

## Remaining manual tasks

1. Install dependencies and run lint, type-check, build, and browser QA; resolve any real defects.
2. Reconcile the CSV against workbook outputs, recalculate the workbook in a spreadsheet engine, and check formulas after Google Sheets conversion.
3. Re-render `solution.md` in the final document tool and confirm it is at most four A4 pages.
4. Run the four suggested AI prompts, capture genuine outputs/screenshots/links, and complete personal reflection in `ai_usage_log.md`.
5. Review assumptions and wording personally; retain all illustrative labels and distinguish feature adoption from causal retention impact.
6. Select and verify three or four real prototype screenshots; record a 3–5 minute Loom.
7. Create/recover the intended Git repository, inspect history for secrets, commit only reviewed files, then publish the prototype and verify the URL signed out.
8. Upload the workbook to Google Sheets, inspect formulas and errors, configure viewer permissions on each artifact, verify links signed out, and submit the final form before 15 October 2026, 11:59 PM IST.

## Unresolved assumptions

All product funnel, churn, price, margin, cost, pricing take-rate, and rollout inputs remain illustrative unless explicitly identified as supplied by the assignment. No Cheerio customer research, causal experiment, actual business financials, external model pricing verification, or deployment evidence was available in this audit.
