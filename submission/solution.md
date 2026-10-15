# Cheerio Next Best Action: helping new users discover what Cheerio can do

**Assignment B** · Prepared by Harish Vasamsetti · Prototype and numbers use synthetic data and labelled assumptions, not Cheerio data.

## A. User and problem

**Problem (from the brief).** Many users sign up, send a few campaigns, never find chatbots, automations, CRM or analytics, and drift away.

**Target user (a product hypothesis, not validated research).** A non-technical marketing manager or owner at a small-to-medium Indian D2C brand. They already send promotional WhatsApp campaigns, have little time, want repeat purchases and less manual follow-up, and do not know which feature to try next.

**Job to be done.** "Help me get more repeat orders without sending everything by hand, and tell me the one thing worth setting up next."

**Three features to adopt, and why for this segment**

| Feature | Why it fits a D2C business using WhatsApp campaigns |
|---|---|
| Automation (first use case: abandoned-cart reminder) | Replies to shopper behaviour without manual work; targets repeat/recovered purchases. |
| Chatbot flows | Customers reply to campaigns with routine questions (order status, delivery); a flow answers instantly and hands over when needed. |
| Customer segmentation | Lets the owner stop sending one message to everyone and speak differently to repeat buyers; plausibly reduces irrelevant sends. |

**Facts vs assumptions**

| Established by the brief | My assumptions (to test) |
|---|---|
| Cheerio supports WhatsApp, AI agents, email, SMS, Instagram, RCS and voice. Users include non-technical owners and marketers. Users are failing to discover chatbots, automations, CRM and analytics. | The persona above. That D2C is the best first segment. That "not knowing which feature fits" (not price or trust) is a main cause of disengagement. That abandoned-cart recovery is the easiest first win. The prototype's account numbers are invented. |

## B. Alternatives and prioritisation

**Scoring method.** Each option is scored 1–5 on four criteria where 5 is best: Impact on activation (35%), Confidence the idea works for this problem (25%), Ease of building (20%), and Time to value for the user (20%). Score = weighted sum, maximum 5.0. *All scores are my judgment from reasoning, not data; they should be re-scored with Cheerio's team.*

| Option | Impact | Conf. | Ease | Time to value | Score | Main risk |
|---|---|---|---|---|---|---|
| Use-case templates | 4 | 4 | 3 | 4 | **3.80** | Templates feel generic; need WhatsApp approval |
| Trigger-based next-best-action | 4 | 3 | 3 | 4 | **3.55** | Irrelevant or repetitive prompts cause fatigue |
| Onboarding checklists | 3 | 3 | 4 | 4 | 3.40 | Generic; ignores the user's situation |
| Interactive setup wizards | 4 | 4 | 2 | 3 | 3.40 | Costly to build per feature |
| Lifecycle email/WhatsApp nudges | 3 | 3 | 4 | 4 | 3.40 | Adds messages; consent and fatigue risk |
| Usage-based CS interventions | 4 | 3 | 2 | 3 | 3.15 | Does not scale to small accounts |
| Static feature tours | 2 | 3 | 4 | 4 | 3.05 | Shown before the user has a need |
| Contextual tooltips | 2 | 3 | 3 | 4 | 2.85 | Explains UI, not which feature to pick |
| Webinars and human onboarding | 3 | 4 | 2 | 2 | 2.85 | Slow, low reach |
| AI product assistant | 3 | 2 | 1 | 2 | 2.15 | Cost, accuracy and safety risk |

**Chosen MVP.** A rules-based recommendation that picks *when and what* (trigger-based next best action) and hands off to a template-based guided setup that handles *how* (templates plus a short wizard). Templates alone do not solve "I don't know what to try"; a recommendation alone has no fast path to action. *Sensitivity check:* with equal weights, templates still rank first and the recommendation ties with checklists and nudges at 3.50, so the scores do not clearly separate them. The tie-break is qualitative: the stated problem is that users do not know which feature fits *them*, which only a contextual trigger addresses.

**Rejected for the MVP.** Tours, tooltips and checklists are generic and appear regardless of need. An AI assistant adds per-use cost and risk and has the lowest confidence. Webinars and CS calls do not reach small accounts at low cost; CS stays for high-value accounts later. Lifecycle nudges are a good phase-2 channel once the rules prove relevant.

**Principal risks and mitigations**

| Risk | Mitigation |
|---|---|
| Recommendations are irrelevant or repeat | One suggestion at a time; reasons shown; dismiss and "not relevant" feedback; suppression (section C). |
| Feature adoption does not improve retention | Measure with a randomised holdout, not before/after (section D). |
| Users activate something that messages customers badly | Opt-in only, quiet hours, weekly cap, draft vs active, preview before activation. |
| Rules are wrong for some accounts | Start with three rules; review weekly using dismissal reasons. |

## C. Solution and experience

**Mechanism (event-driven, rules-based).** Product events (campaigns sent, active automations, flows, segments, store connection, inbound replies) are evaluated against three rules. An account is *eligible* for a recommendation when its rule's conditions hold. Eligible recommendations are ranked by **priority weight × evidence strength** (evidence = observed count relative to a cap, 0 to 1). Only the top one is shown, in the dashboard, with a "Why am I seeing this?" panel that lists the exact conditions. Example rule: ≥3 campaigns sent, 0 active automations, store connected → "Recover abandoned carts automatically". There is no model call per impression, so variable cost is near zero (Cost model sheet).

**Suppression (proposed).** Activated: never shown again. Draft saved: replaced by "Continue setup". Dismissed: hidden for a proposed 30 days. "Remind me later": hidden for 7 days. "Not relevant": hidden until the user brings it back. At most one visible recommendation and a proposed cap of one new recommendation per account per week. All dismissed items remain findable under **Recommendations**.

**How the wizard helps a non-technical user.** Three steps (template, settings, review) in plain language, preview with sample values, safe defaults (one reminder per shopper per week, quiet hours on, opt-in only), validation that keeps the cart link, an explicit **draft vs activate** choice, and a retry path if activation fails.

**MVP scope.** Dashboard recommendation, explanation, feature detail with an editable upside estimate, guided setup for one automation (abandoned cart), success state with the next recommendation, recommendations list, insights view. **Non-goals:** real messaging, real WhatsApp template submission, a production rules engine, guided setup for chatbot and segmentation (shown only as the next recommendation), an AI layer, and any claim about real results.

**Feedback improves relevance.** Dismissal reasons feed a weekly review: high "not relevant" on a rule means tighten its conditions; "already do this elsewhere" suggests a detection gap; "too many" tightens the cap.

**Privacy, consent and messaging safety.** Recommendations use event counts, not message content. Automations message only customers who opted in, respect quiet hours and a frequency cap, and stop once the shopper purchases. WhatsApp business-initiated messages need approved templates; the real flow must submit them and show approval status. Data handling should be reviewed against applicable Indian data-protection requirements (for example the DPDP Act, 2023); I am not a lawyer and this needs proper review.

## D. Metrics and experimentation

**Three primary metrics**

| Metric | Numerator | Denominator | Window | Data source |
|---|---|---|---|---|
| 1. Feature activation rate among eligible exposed accounts | Accounts whose automation, segment or flow reached *active* (not draft) | Eligible accounts with ≥1 recommendation impression | 14 days from first impression | Product event log (impression, setup_activated) joined to account table |
| 2. Time from exposure to successful activation | Median of (activation time − first impression time) | Accounts that activated | Within 30 days; report share not yet activated | Event timestamps |
| 3. Day-30 retained active-account rate | Exposed accounts still active at day 30 (definition of "active" to be agreed, e.g. sent a message or ran a workflow) | All exposed accounts in the cohort | Day 30 after first impression | Usage and subscription records |

**North Star:** *Weekly active accounts completing at least one meaningful non-campaign workflow.*

**Target (proposed, not a known baseline or a promise).** A **20% relative** improvement from a *measured* baseline over three months, applied to the North Star and to metric 1. For example, if baseline activation were 10%, the target would be 12%, not 30%. Retention moves slowly and a 20% relative gain would be very large, so for metric 3 I would track it and report intervals rather than set a target.

**Measuring incremental impact.** Adoption does not automatically cause retention, because accounts that adopt features are likely already more engaged. Use a randomised holdout: randomly withhold recommendations from a proposed 10–20% of eligible accounts, fix the primary metric and window in advance, and compare treatment against holdout. Sample size matters: with my placeholder rates, detecting activation (about 5% in the holdout vs about 13% treated) needs roughly 200 accounts per arm, which is feasible. The expected retention gap is under one percentage point and would need tens of thousands of accounts per arm, far more than the roughly 2,000 eligible accounts I assume. So a 90-day holdout can test activation but cannot prove retention; retention stays an unproven hypothesis, to be tracked over longer cohorts. Guardrails: dismissal rate, opt-outs and complaints, support tickets.

**90-day plan**

| Month | Focus |
|---|---|
| 1 | Instrument events and fix definitions; measure baselines; test relevance and usability of the prototype with a handful of target users; legal and template review. |
| 2 | Controlled rollout with holdout; improve onboarding copy and templates from dismissal feedback; run the activation experiment. |
| 3 | Tune rules and caps; first retention read-out by cohort; extend to other segments and the chatbot and segmentation setups if relevance holds. |

**Business case (illustrative; every input is a placeholder, not Cheerio data).** Retention benefit is credited only to *incremental* activators (treated minus control activation), who are assumed to churn 3.5% a month instead of 5%, after a one-month lag. Two views use the same 12-month horizon and the same fixed cost: a **single cohort** (launch once to the existing eligible base) and a **recurring monthly rollout** (that cohort plus a new cohort of newly eligible accounts each month).

| ROI on programme cost, 12 months | Conservative | Base | Optimistic |
|---|---|---|---|
| Single cohort | −94% | −55% | +49% |
| Recurring monthly rollout | −93% | −47% | +81% |

**The Base case does not pay back.** It needs about 209 incremental retained account-months to cover the placeholder cost (₹37,000 a month, mostly a team allocation); Base delivers about 94 (single cohort) or 111 (recurring). Cost per incremental retained account-month is about ₹4,000–4,700 against roughly ₹2,100 of margin per account-month. Making churn or activation worse than base (sensitivity grids in the workbook) deepens the loss; only the Optimistic inputs pay back. The value of discovery beyond retained plan revenue (deeper usage, expansion) is not counted. This is a finding to test, not a forecast.

**Pricing (same horizon and cost basis for all three options).** A paid add-on edges free by about ₹54,000 (single cohort) to ₹85,000 (recurring) in Base, but 70–85% of the revenue in the paid options is guessed take rate, and the add-on only wins if take rate is at least about 2% (I assume 3%). I would still launch free: a paywall shrinks the exposed group, muddies the holdout, and the model has no evidence for the friction it assumes. Revisit once real activation data exists.