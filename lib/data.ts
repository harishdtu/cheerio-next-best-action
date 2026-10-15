// All data in this file is synthetic and for prototype purposes only.
// "Kaveri Naturals" is a fictional business. No Cheerio data or credentials are used.

export type RecId = "abandoned-cart" | "chatbot-faq" | "segment-repeat";
export type RecStatus =
  | "new"
  | "dismissed"
  | "snoozed"
  | "not_relevant"
  | "draft"
  | "activated";

export const business = {
  name: "Kaveri Naturals",
  owner: "Meera",
  city: "Bengaluru",
  plan: "Growth plan (sample)",
};

// Observed product events (mock). The rules engine reads only these.
export const account = {
  campaignsSent: 3,
  contacts: 2640,
  optedInContacts: 2140,
  automationsActive: 0,
  chatbotFlows: 0,
  segments: 0,
  storeConnected: true,
  abandonedCarts30d: 412,
  inboundReplies30d: 186,
  daysSinceSignup: 41,
};

export const campaigns = [
  { name: "Navratri skincare combo", date: "22 Sep", sent: 2010, read: 1190, replies: 61 },
  { name: "Weekend 15% off serums", date: "3 Oct", sent: 2090, read: 1262, replies: 54 },
  { name: "Diwali early access", date: "9 Oct", sent: 2140, read: 1311, replies: 71 },
];

export interface Rec {
  id: RecId;
  feature: "Automation" | "Chatbot flows" | "Customer segmentation";
  title: string;
  summary: string;
  weight: number; // priority weight (proposed, tunable)
  evidenceCap: number; // evidence saturates at this count
  evidenceKey: keyof typeof account;
  rule: string;
  signals: (a: typeof account) => { label: string; met: boolean }[];
  how: string[];
  wizardAvailable: boolean;
}

export const recs: Rec[] = [
  {
    id: "abandoned-cart",
    feature: "Automation",
    title: "Recover abandoned carts automatically",
    summary:
      "Send one timely WhatsApp reminder to opted-in shoppers who leave items in their cart, without sending each message by hand.",
    weight: 1.0,
    evidenceCap: 200,
    evidenceKey: "abandonedCarts30d",
    rule: "≥3 campaigns sent AND 0 active automations AND store connected",
    signals: (a) => [
      { label: `${a.campaignsSent} campaigns sent (needs ≥3)`, met: a.campaignsSent >= 3 },
      { label: `${a.automationsActive} active automations (needs 0)`, met: a.automationsActive === 0 },
      { label: `Store connected, ${a.abandonedCarts30d} abandoned carts in last 30 days (sample)`, met: a.storeConnected && a.abandonedCarts30d > 0 },
    ],
    how: [
      "A shopper adds items to their cart and leaves.",
      "After the delay you choose, Cheerio checks they opted in and are outside quiet hours.",
      "One approved WhatsApp template goes out with a link back to their cart.",
      "The automation stops for that shopper once they buy.",
    ],
    wizardAvailable: true,
  },
  {
    id: "segment-repeat",
    feature: "Customer segmentation",
    title: "Group your repeat buyers into a segment",
    summary:
      "Create a saved audience of customers who bought more than once so campaigns can speak to them differently.",
    weight: 0.8,
    evidenceCap: 3000,
    evidenceKey: "contacts",
    rule: "≥500 contacts AND ≥3 campaigns sent AND 0 saved segments",
    signals: (a) => [
      { label: `${a.contacts.toLocaleString("en-IN")} contacts (needs ≥500)`, met: a.contacts >= 500 },
      { label: `${a.campaignsSent} campaigns sent (needs ≥3)`, met: a.campaignsSent >= 3 },
      { label: `${a.segments} saved segments (needs 0)`, met: a.segments === 0 },
    ],
    how: ["Pick a rule such as 'ordered 2+ times'.", "Save it as a segment.", "Use it as the audience for your next campaign."],
    wizardAvailable: false,
  },
  {
    id: "chatbot-faq",
    feature: "Chatbot flows",
    title: "Answer common questions with a chatbot flow",
    summary:
      "Reply instantly to repeat questions such as order status and delivery time, and hand over to your team when needed.",
    weight: 0.9,
    evidenceCap: 300,
    evidenceKey: "inboundReplies30d",
    rule: "≥100 inbound replies in 30 days AND 0 chatbot flows",
    signals: (a) => [
      { label: `${a.inboundReplies30d} inbound replies in 30 days (needs ≥100)`, met: a.inboundReplies30d >= 100 },
      { label: `${a.chatbotFlows} chatbot flows (needs 0)`, met: a.chatbotFlows === 0 },
    ],
    how: ["Choose a starter flow.", "Edit the answers.", "Set when a human takes over."],
    wizardAvailable: false,
  },
];

export const templates = [
  {
    id: "gentle",
    name: "Gentle reminder",
    note: "One message, no discount. Lowest risk of annoying shoppers.",
    body: "Hi {{first_name}}, you left {{product}} in your cart at Kaveri Naturals. It's saved for you: {{cart_link}}",
    delayHours: 2,
  },
  {
    id: "nudge",
    name: "Reminder with small incentive",
    note: "One message offering free shipping. Check this against your margins.",
    body: "Hi {{first_name}}, still thinking about {{product}}? Complete your order today and shipping is on us: {{cart_link}}",
    delayHours: 4,
  },
  {
    id: "help",
    name: "Helpful check-in",
    note: "Asks if they need help; replies reach your inbox.",
    body: "Hi {{first_name}}, we noticed {{product}} is still in your cart. Reply here if you have questions about ingredients or delivery, or finish here: {{cart_link}}",
    delayHours: 4,
  },
];

// Synthetic, illustrative cohort data. Internally consistent by construction.
export const seededFunnel = {
  eligible: 1840,
  impressions: 1412, // accounts exposed
  clicks: 436,
  setupStarts: 298,
  activations: 187,
  dismissals: 233,
  notRelevant: 61, // subset of dismissals
};
