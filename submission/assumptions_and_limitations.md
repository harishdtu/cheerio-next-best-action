# Assumptions and limitations (revised after the workbook audit)

## What changed in the audit, and why it matters

| Finding in v1 | Fix in v2 |
|---|---|
| Retention gap was assumed independently of activation. In Base it implied each incremental activator churned about 2.3% a month vs 5% (the Conservative case implied 1.4%, more favourable despite weaker activation). This made the v1 ROI (+4.7% Base) too flattering. | Retention benefit is now credited only to incremental activators (treated minus control activation), with their own churn input and an activation lag. Weaker activation automatically means weaker retention. |
| One cohort was modelled while costs ran for the full horizon, with no recurring view. | Two explicit views on the same horizon and cost basis: Scenario 1 single cohort; Scenario 2 recurring monthly rollout. New Cohort engine sheet shows every cohort. |
| Pricing options mixed time bases (12-month average for retention, first-month run-rate for direct revenue). | All three options are computed over the same horizon, same fixed cost, same AI cost, for both scenarios. Build cost for B and C is an input (default 0). |
| Labels such as "monthly exposure cohort" and "Total monthly operating cost" were misleading. | Relabelled as launch cohort and launch-month figures; ROI is defined as contribution / programme cost. |
| No sensitivity to worse activation or churn. | Two ROI grids (single cohort, recurring) vary churn of incremental activators and activation conversion, with check cells that tie the base cell to the model. |

## Headline results (Base inputs unless stated; all from placeholders)

- ROI over 12 months: single cohort −94% / −55% / +49% and recurring −93% / −47% / +81% (Conservative / Base / Optimistic). **The Base case does not pay back.**
- Break-even is about 209 incremental retained account-months. Base delivers about 94 (single cohort) and 111 (recurring).
- Pricing: a paid add-on edges free by about ₹54,000 (single cohort) to ₹85,000 (recurring), but 70–85% of B's and C's revenue is guessed take rate. C beats A only if take rate is at least about 2.1% (single cohort) or 1.9% (recurring) vs 3% assumed. No option pays back in Base.
- Measurability: with the placeholders, activation needs about 200 accounts per arm; the expected retention gap (under 1 percentage point) would need about 54,000 per arm. This is an illustrative two-proportion calculation (5% significance, 80% power) outside the workbook, using placeholder rates.

## Assumptions that need your review

| # | Assumption | Where | Why it matters |
|---|---|---|---|
| 1 | Persona and segment (non-technical D2C owner on WhatsApp) | solution.md A | Hypothesis; no research done. |
| 2 | Abandoned-cart recovery as the first win | Prototype, solution.md | From the brief's example; no Cheerio data. |
| 3 | Prioritisation scores and weights | solution.md B | My judgment; equal weights do not clearly separate the recommendation from checklists and nudges. |
| 4 | Rule thresholds and weights | lib/data.ts, solution.md C | Proposed, untested. |
| 5 | Suppression durations (30 days, 7 days, weekly cap) | solution.md C | Proposed; the prototype suppresses until "Bring back" and does not time-box. |
| 6 | Eligible share 30/40/50%; exposure 70/80/90% | Assumptions | Unknown; must come from events. |
| 7 | Funnel rates (click, start, completion) | Assumptions | Near the prototype's synthetic funnel, itself invented. |
| 8 | Control activation 4–6% | Assumptions | Needs a real holdout. |
| 9 | Control churn 5%/month; incremental-activator churn 3–4% | Assumptions | Placeholders; the retention effect is the whole business case. |
| 10 | Activation lag 1 month | Assumptions | Placeholder. |
| 11 | Newly eligible inflow 1.5–3% of active per month | Assumptions | Illustrative; drives Scenario 2 only. |
| 12 | Plan price ₹2,500; gross margin 85% | Assumptions | Not Cheerio's real values. |
| 13 | Fixed cost ₹37,000/month (mostly a ₹25,000 team allocation) | Assumptions | Placeholder; dominates the result. Many teams would not add this cost. |
| 14 | LLM token and FX prices | Assumptions | Unverified placeholders, unused (AI layer off). No pricing source or access date exists; verify and record both before switching the AI layer on. |
| 15 | Pricing inputs (higher-plan share, upgrade rate, uplift, add-on price, take rate, friction, fees) | Assumptions | Guesses; they drive the A/B/C ranking. |
| 16 | Audit thresholds | Billing and audit | Proposed operating settings, not Cheerio standards. |

## Model limitations

- No discounting, taxes, seasonality, cannibalisation or support cost. Benefits after the horizon are not credited.
- Non-activators are assumed unaffected. Control retention is assumed constant.
- Direct revenue for B and C is assumed fully incremental and retained at control churn; build and billing support costs default to 0, which favours B and C.
- The model supports horizons up to 24 months. Fractional account counts are expected values.
- Audit "observed" values are example data; only check 2 is set to ALERT, to show the logic.
- The prototype's Insights baseline (for example 1,840 eligible accounts) is a separate synthetic set and is not tied to the workbook's numbers.

## Prototype limitations

- Local mock data and state only; refreshing resets everything. No backend, authentication or integration. No message is sent and no automation exists.
- Only the abandoned-cart setup has a wizard; chatbot and segmentation open preview-only pages. "Not built" sidebar items are inert.
- Insights combine a synthetic baseline with your session clicks.
- Accessibility: keyboard use, labels, focus rings, a skip link, live regions and responsive layout were checked in Chromium by script and a partial visual review. Not done: screen reader testing, a formal contrast audit, other browsers. On first load focus moves to the main area, so the first Tab press skips the skip link.
- No usability testing with real users was done.
- `npm install` reports dependency advisories from the default Next.js 14 scaffold; review before deploying beyond a demo.

## Verification performed in this pass

- Workbook recalculated with LibreOffice: 884 formulas, 0 errors. Base ROI for both scenarios reproduced independently in Python (single cohort −55.1%, recurring −46.9%); both sensitivity grids tie to the model (check cells show OK); break-even take rate confirmed by recomputing Option C minus Option A at that rate (difference 0).
- Solution document rendered from Markdown to A4 PDF in Chromium (10.5 pt, 18 mm margins): 4 pages with roughly half a page of headroom. Google Docs or Word layout may differ; recheck after pasting.
- Prototype checks: see the final report for the commands run.

## Not created, and not claimed

No Google Sheet, Google Doc, public prototype URL or Loom video exists. The AI usage log remains a blank template: no prompts, outputs, conversation links or screenshots have been recorded, and no external pricing source has been cited.
