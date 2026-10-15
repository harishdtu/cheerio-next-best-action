# Cheerio Next Best Action (assignment prototype)

An interactive prototype for Assignment B (feature discovery). It uses **local mock data and local state only**. It does not connect to Cheerio, send messages, or activate anything. All business data is synthetic ("Kaveri Naturals" is fictional).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm start`. It deploys to Vercel with default Next.js settings.

## Implemented interactions

- Dashboard with loading skeleton and sample campaign data (labelled as sample)
- Single personalised recommendation chosen by a rules engine (`lib/engine.ts`, data in `lib/data.ts`)
- "Why am I seeing this?" panel listing the exact conditions
- Dismiss with reasons (not relevant, already doing this, remind me later, too many) and a cancel path
- Recommendations view: ranked list with scores, status, rule text, **Open** and **Bring back**
- Feature detail page with how-it-works steps, message preview and an editable upside estimator (illustrative)
- Guided setup: template choice, settings (delay, message, weekly limit, quiet hours, opt-in locked), validation
- Review screen with a clear draft vs active explanation, **Back**, **Save as draft**, **Activate (simulated)**
- Setup failure state with retry guidance, and **Try activating again**
- Success states that distinguish "Draft saved" from "Activated (simulated)", show 0 messages sent, and offer the next recommended action
- Draft banner on the dashboard with **Continue setup**
- No-recommendation (empty) state
- Insights view: synthetic baseline plus session counters for impressions, clicks, setup starts, activations, dismissals and "not relevant"
- Prototype controls: fail the next activation once, show the empty state, reset the demo
- Responsive layout with a collapsible mobile menu; keyboard-operable controls, labels, focus rings, skip link

Not built (shown as inert in the sidebar): Campaigns, Contacts, Automations, Chatbots. Setup wizards for chatbot and segmentation are out of scope.

## Files

`app/` Next.js entry, `components/` UI and screens, `lib/` mock data and rules engine, `submission/` assignment documents, workbook and screenshots.
