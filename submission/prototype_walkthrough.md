# Prototype walkthrough

The prototype runs locally with `npm run dev` (see the repo README) and can be deployed to Vercel. No public URL exists yet.

## Main click path (about 90 seconds)

1. Open the app. A short loading skeleton appears, then the dashboard shows the recommendation **Recover abandoned carts automatically**.
2. Click **Why am I seeing this?** to see the exact conditions behind it.
3. Click **See how it works**. Read the steps and the preview, and change the numbers in **Estimate your upside** (illustrative).
4. Click **Set up this automation**.
5. Step 1: pick a template (default **Gentle reminder**), click **Continue**.
6. Step 2: adjust the delay, message, weekly limit and quiet hours. Delete `{{cart_link}}` once to see validation, then restore it. Click **Review**.
7. Review: read the summary and the draft-vs-active note. Click **Activate (simulated)**.
8. Success: note the status "Activated (simulated)", "Messages sent: 0 (prototype)", and **Next recommended action** (Group your repeat buyers into a segment). Click **See how it works** to open it (preview-only), then **Back to dashboard**.

## Side paths to show

- **Draft vs activated:** on Review click **Save as draft**; the success screen says "Draft saved. Nothing is live yet" and the dashboard shows **Continue setup**.
- **Failure and retry:** open **Prototype controls** in the sidebar, tick "Make the next activation fail once", run the path to Review, click **Activate (simulated)**, read the error guidance, click **Try activating again**.
- **Dismiss and feedback:** on the dashboard click **Dismiss**, choose a reason, confirm. Open **Recommendations** to see it listed and click **Bring back**.
- **No-recommendation state:** tick "Show the no-recommendation state".
- **Measurement:** open **Insights** (synthetic baseline plus your session clicks).
- **Reset:** **Reset demo** in Prototype controls.

## Screenshots

Real captures of the running prototype are in `submission/screenshots/`:

| File | Shows |
|---|---|
| 01-dashboard-recommendation.png | Recommendation with the "why" panel |
| 02-details.png | Feature explanation, preview, upside estimator |
| 03-configure.png | Settings step |
| 04-success.png | Success state and next recommended action |
| 05-insights.png | Measurement view |
| 06-error-retry.png | Setup failure with retry guidance |
| 07-mobile.png | 390 px wide layout |
| 08-draft-saved.png | Draft saved, nothing live |

**Suggested four for the submission:** 01, 03, 04 and 06 (or 05 if you prefer to show measurement). Check them yourself and recapture if you change the app. To recapture: run `npm run dev`, walk the path, and use the browser's capture tool.

## Loom script (target 4 minutes)

| Time | Say and show |
|---|---|
| 0:00–0:25 | The problem in one sentence, who the user is, and that the persona is a hypothesis. Show the dashboard. |
| 0:25–1:00 | The recommendation card and "Why am I seeing this?". Explain the rule and that it is rules-based on purpose (no per-impression model cost, easy to explain). |
| 1:00–2:15 | Click through details, template, settings, review. Point out safe defaults, opt-in only, validation, and the draft vs activate choice. Activate and show the success screen: "0 messages sent, simulated". |
| 2:15–2:45 | Show the failure and retry state (Prototype controls), then dismiss with a reason and Recommendations. |
| 2:45–3:15 | Insights: the three primary metrics, the North Star, and that numbers here are synthetic. |
| 3:15–3:50 | The workbook: assumptions, funnel, and the business case. State plainly that the Base case does not pay back on placeholder inputs (about −55% single cohort, −47% recurring), that only the Optimistic case does, and that the expected retention gap is too small for a holdout on this base size to detect; activation is what the experiment can measure. |
| 3:50–4:15 | Trade-offs and what I would do next; what I personally decided and what AI helped with. |

## Trade-offs to explain

- One complete journey instead of many shallow screens.
- Rules before AI: predictable, explainable, near-zero variable cost; less flexible.
- One recommendation at a time: less fatigue, slower discovery of other features.
- Free discovery: fewer barriers and a cleaner holdout; the model shows a paid add-on ahead of free on guessed take rates, so say why you still start free and what data would change that.
- Holdout for causality: costs a small share of accounts and time, but avoids claiming retention from adoption.

## Metrics to state

Primary: feature activation rate among eligible exposed accounts; time from exposure to activation; day-30 retained active-account rate. North Star: weekly active accounts completing at least one meaningful non-campaign workflow. Proposed target: 20% relative improvement from a measured baseline (not a known baseline, not a promise).

## How to publish (nothing below has been done)

1. **Prototype on Vercel:** push the repo to GitHub, import it at vercel.com, accept the Next.js defaults, deploy. Open the URL in a private window and run the main path.
2. **Google Sheet:** in Google Sheets choose File > Import > Upload `financial_model.xlsx`, create a new spreadsheet, then check each sheet for `#NAME?` or `#REF!` errors and that conditional formatting survived. Compare the base ROI with `financial_model.csv`.
3. **Solution document:** paste `solution.md` into Google Docs (or export to PDF), and re-check it is within four pages.
4. **Loom:** record 3–5 minutes using the script above.
5. **Sharing:** set Google files and the Loom to "Anyone with the link can view". Test every link while signed out.
6. **Submit** the links through the form the company supplied before 15 October 2026, 11:59 PM IST. Do not leave this to the last hour.

## Final checklist

- [ ] Prototype URL opens signed out and the main path completes
- [ ] Sheet link opens signed out; formulas visible; no errors
- [ ] Solution document within four pages, name added
- [ ] AI usage log filled with real prompts, outputs and links only
- [ ] Three or four screenshots chosen and checked
- [ ] Loom 3–5 minutes, link works signed out
- [ ] Assumptions I changed are reflected in solution.md numbers
- [ ] No placeholder text left anywhere (search for square brackets)
- [ ] Submitted before the deadline
