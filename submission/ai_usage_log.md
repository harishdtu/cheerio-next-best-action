# AI usage log (template: fill in honestly)

**Status of this file:** it is a blank template. Nothing below has been run yet. Do not submit it with the example prompts unrun, and do not describe a failure that did not happen. If a prompt behaves differently from what is hoped for, record what actually happened.

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
> I am designing feature discovery for a WhatsApp marketing platform used by non-technical owners of small Indian D2C brands. Users send a few campaigns, then do not find automation, chatbot flows or segmentation. Score these ten interventions from 1 to 5 on impact, confidence, ease and time to value, give a one-sentence reason for each score, and say which scores you are least sure about and what evidence would change them. Interventions: [paste list].

*Check afterwards:* are the reasons specific to this segment? Which scores are guesses presented as facts? Re-score yourself before accepting any.

**2. Critiquing the journey and edge cases**
> Here is my proposed recommendation-to-activation journey: [paste the click path from prototype_walkthrough.md]. Act as a sceptical product reviewer. List the ten most likely ways this fails for a real user, including consent, WhatsApp template approval, repeated recommendations, partial setup and failure states. For each, say whether my prototype already handles it.

*Check afterwards:* verify every "already handled" claim against the running prototype yourself.

**3. Stress-testing the financial model**
> Below are the assumptions and formulas of my business-case model: [paste key assumptions and the retention formulas]. Find double-counting, unit errors, survivorship issues, and any place where an observed correlation is treated as causal. Do not suggest new features; only critique the logic.

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
