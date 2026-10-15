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

**Suggested four for the submission:** `01-dashboard-recommendation.png`, `02-details.png`, `03-configure.png`, and `04-success.png`. Together they show the recommendation, rationale and feature preview, setup, and simulated success. The screenshots were inspected visually on 15 October 2026. Harish reports overall manual Chrome QA passed, but did not enumerate individual flows. Confirm these screenshots match the current build before using them as evidence. Optional supporting evidence: `06-error-retry.png` (failure handling), `07-mobile.png` (390 px layout), or `05-insights.png` (synthetic measurement view). Do not represent old screenshots as a fresh interaction test. To recapture later, open the running app in Chrome and use its screenshot capture tool.

## Loom script (target 4 minutes)

Record after manually checking the current app. This script is a speaking outline, not evidence that QA or any AI prompt has already been completed.

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

## Publication instructions (nothing below has been done)

Before deployment, verify the official security guidance applicable to installed Next.js 16.4.1, confirm the reported clean production audit, and obtain Harish approval. Overall manual Chrome QA is reported as passed; record specific checks accurately.

### Open and review Git safely

1. Open `C:\Users\haris\Downloads\cheerio-next-best-action` in your regular, writable VS Code session.
2. In its integrated terminal run `git status --short`, `git diff --check`, `git diff`, and `git diff --cached`. Review every changed file and confirm no credentials, `.env` values, generated build files, or unrelated edits are included.
3. When satisfied, stage with `git add -A`, then run `git diff --cached --check`, `git diff --cached --stat`, and `git diff --cached`. Stage only intended files; unstage accidental files with `git restore --staged <path>`. Commit only after reviewing the staged patch, for example `git commit -m "chore: finalize Cheerio assignment readiness"`.
4. Do not delete `.git/index.lock` unless you have confirmed no Git process is running and the lock is stale. Do not reset or rewrite history to work around the current workspace restriction.

### Push to GitHub after approval

1. Decide repository visibility and create/select the intended GitHub repository.
2. Check `git remote -v`; configure `origin` only if needed, using the approved repository URL.
3. Confirm the branch and staged commit with `git status --short --branch` and `git log -1 --oneline`, then push the intended branch, e.g. `git push -u origin main`. Confirm the commit appears in GitHub.

### Deploy to Vercel after security and QA pass

1. Import the approved GitHub repository in Vercel and use the detected Next.js settings. This prototype has no required production secrets or external integrations.
2. Deploy a preview first. Open it in a signed-out/private browser window and repeat the dashboard-to-success path, failure/retry, Insights, and mobile checks.
3. Promote/deploy production only after the preview passes and you approve. Record the URL and recheck it signed out.

### Create and verify assignment deliverables

1. **Google Sheets:** In Sheets choose **File > Import > Upload**, select `financial_model.xlsx`, and import as a new spreadsheet. Check all seven sheets, formulas, number formats, and conditional formatting. Confirm there are no `#REF!`, `#VALUE!`, or `#NAME?` errors. Compare Base outputs to `financial_model.csv`; investigate discrepancies before sharing. Keep the source workbook unchanged.
2. **Solution document:** Paste `solution.md` into Docs or export it to PDF. Set paper to A4 and confirm it is no more than four pages; add your name and inspect the final rendering.
3. **AI evidence:** Run the prepared prompts yourself, save actual outputs and links/screenshots, compare the weak prompt with its improved version, and add your own reflection. Do not include fabricated outputs or links.
4. **Screenshots and Loom:** Check screenshots against the current app. Record a 3–5 minute Loom only after Chrome QA; include the simulated-product and illustrative-model caveats in the script above.
5. **Sharing:** Set each approved deliverable to **Anyone with the link — Viewer** only if that is permitted by your account and assignment rules. Open every link in a signed-out/private window and confirm it loads without edit access.
6. **Submit:** Enter the verified prototype, Sheet, document, Loom, and any required AI evidence links in the company’s submission form by the assignment deadline (15 October 2026, 11:59 PM IST; confirm the form remains open). Save the confirmation.
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
