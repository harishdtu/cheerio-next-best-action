# AI usage log (template: fill in honestly)

**Status of this file:** the assignment prompts below are prepared but have not been run by Harish. This repository was also updated with AI assistance for dependency security, lint migration, and submission notes on 14 October 2026; add an honest personal reflection about that work before submission. No prompt output, chat link, screenshot, or user decision is claimed here.

## How I will record each entry

Copy this block once per prompt.

```
### Entry N: <theme>
- Tool and model used:
- Date and time:
- Actual prompt (paste exactly):
- Output received (paste or summarise; link to the real conversation or add a screenshot):
- What was useful:
- What was incorrect, weak or unverifiable:
- What I changed and why:
- What I personally decided, verified or implemented:
- Evidence (real conversation link or screenshot path):
```

## Three prompts worth testing (suggestions only)

**1. Prioritising discovery interventions**
> I am designing feature discovery for a WhatsApp marketing platform used by non-technical owners of small Indian D2C brands. Users send a few campaigns, then do not find automations, chatbot flows, segmentation, CRM, or analytics. Score each of these interventions from 1 to 5 on impact on activation, confidence it addresses the problem, ease to build, and time to user value. Give one reason per score, flag assumptions, and state what evidence would change your top choice. Interventions: use-case templates; trigger-based next-best-action; onboarding checklists; interactive setup wizards; lifecycle email/WhatsApp nudges; usage-based customer-success outreach; static feature tours; contextual tooltips; webinars/human onboarding; AI product assistant. Do not claim these scores are data.

*Check afterwards:* are the reasons specific to this segment? Which scores are guesses presented as facts? Re-score yourself before accepting any.

**2. Critiquing the journey and edge cases**
> Review this prototype journey as a skeptical product reviewer: a dashboard shows one rule-based recommendation and its reason; the user opens a feature explanation and sample message; chooses a template; edits delay, copy, quiet hours, and weekly cap; reviews settings; then saves a draft or simulates activation. The prototype also has dismissal reasons, a recommendations list, a simulated activation failure/retry, and synthetic insights. List the ten most likely real-user failure modes, including WhatsApp opt-in/template approval, repeated or irrelevant recommendations, partial setup, draft confusion, and retry failures. For each, distinguish (a) what this description says the prototype represents, (b) what would still need hands-on verification, and (c) what a real integrated product must do. Do not assume that a screenshot proves the interaction works.

*Check afterwards:* verify every "already handled" claim against the running prototype yourself.

**3. Stress-testing the financial model**
> Critique this illustrative business case without inventing benchmark data. The launch cohort has 5,000 active businesses, 40% hypothesized eligible, and 80% exposed. Base recommendation funnel is 30% click × 68% setup start × 63% completion = 12.852% activation among exposed; control activation is 5%. Only treatment-minus-control incremental activators receive a retention benefit. Control churn is 5% monthly; incremental-activator churn is assumed 3.5%, after a one-month activation lag. The horizon is 12 months. Plan price is ₹2,500 per account-month, gross margin 85%, and fully loaded cost ₹37,000/month (₹444,000 total). The model's cached Base results are about 93.8 incremental retained account-months / -55.1% ROI for one cohort and 110.9 account-months / -46.9% ROI for recurring rollout; break-even is about 208.9 account-months. Identify possible unit errors, double counting, cohort/survivorship issues, and causal overclaims. Check whether the stated formula logic could produce the results, but do not claim you opened or recalculated the workbook. Separate confirmed arithmetic from questions that require workbook inspection. Do not recommend product features.

*Check afterwards:* recompute any claimed error by hand in the sheet before changing anything.

## One deliberately weak prompt (to run, then improve)

> Design a perfect AI-powered product that increases retention.

**How to use it.** Run it as written and record the real output. Then write down, from what you actually see, why it is weak (for example: no user, no constraint, no success measure, no way to test the answer). Replace it with a constrained, testable prompt such as:

> For small Indian D2C businesses sending WhatsApp campaigns, propose three retention interventions that can be built in one week as a prototype with no live integrations. For each, state the target behaviour, the event that would trigger it, one metric, and one way it could backfire.

Run the improved prompt and record how the output differed. Do not describe the failure before you have seen it.

## Critique of AI output (fill after real use)

- Claims I could not verify:
- Numbers I replaced with my own reasoning:
- Places the AI was confidently wrong:

## Honest account of my contributions (fill in)

- Product decisions I made myself:
- Parts drafted with AI help (which tool, which files):
- Parts I rewrote or rejected:
- What I verified by running or recalculating:
- What I did not verify:

## Screenshots and links

- Conversation link or screenshot 1: _(add real one)_
- Conversation link or screenshot 2: _(add real one)_
- Conversation link or screenshot 3: _(add real one)_
- Weak-prompt run: _(add real one)_

## Decisions I must make myself before submitting

- [ ] Is D2C the right first segment, and can I defend it without data?
- [ ] Do I agree with each score in the prioritisation table? Re-score at least the five closest.
- [ ] Is the scoring weight split (35/25/20/20) what I believe?
- [ ] Which three rules ship first, and are the thresholds (≥3 campaigns, ≥100 replies, ≥500 contacts) sensible?
- [ ] What counts as "activated" (active vs. first real trigger fired)? What is "active" for day-30 retention?
- [ ] Do I accept a 20% relative target on North Star and activation, and a softer goal for retention?
- [ ] Holdout size, and whether the eligible base is large enough to measure retention.
- [ ] Plan price, churn, margin, cost allocations: replace placeholders with reasoned values or leave labelled.
- [ ] Pricing recommendation (free vs plan vs add-on): do I still agree after changing inputs?
- [ ] Whether any wording in the solution document does not sound like me.
- [ ] Which three or four screenshots best make my case.
