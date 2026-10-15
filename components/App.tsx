"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { account, business, campaigns, recs, seededFunnel, templates, type RecId, type RecStatus } from "@/lib/data";
import { pickNext, rank } from "@/lib/engine";
import { Badge, Button, Card, SampleTag, Skeleton, inr, pct } from "./ui";
import { WhatsAppPreview } from "./Preview";

type View = "dashboard" | "details" | "wizard" | "review" | "success" | "recs" | "insights";
type Outcome = "draft" | "activated";
const initialStatuses = (): Record<RecId, RecStatus> => ({ "abandoned-cart": "new", "chatbot-faq": "new", "segment-repeat": "new" });
const initialCounters = { impressions: 0, clicks: 0, starts: 0, activations: 0, dismissals: 0, notRelevant: 0 };

const dismissReasons = [
  { id: "not_relevant", label: "Not relevant to my business" },
  { id: "already", label: "I already do this another way" },
  { id: "later", label: "Not now, remind me later" },
  { id: "too_many", label: "Too many suggestions" },
] as const;

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState(initialStatuses);
  const [activeRec, setActiveRec] = useState<RecId>("abandoned-cart");
  const [step, setStep] = useState<1 | 2>(1);
  const [config, setConfig] = useState({ templateId: "gentle", delay: 2, message: templates[0].body, quiet: true, cap: 1 });
  const [counters, setCounters] = useState(initialCounters);
  const [seen, setSeen] = useState<RecId[]>([]);
  const [failNext, setFailNext] = useState(false);
  const [forceEmpty, setForceEmpty] = useState(false);
  const [submit, setSubmit] = useState<"idle" | "saving" | "error">("idle");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [feedback, setFeedback] = useState<{ rec: string; reason: string }[]>([]);
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const next = useMemo(() => (forceEmpty ? null : pickNext(statuses)), [statuses, forceEmpty]);
  const bump = (k: keyof typeof initialCounters) => setCounters((c) => ({ ...c, [k]: c[k] + 1 }));

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Count an impression once per recommendation per session, when it is actually visible.
  useEffect(() => {
    if (view === "dashboard" && !loading && next && !seen.includes(next.rec.id)) {
      setSeen((s) => [...s, next.rec.id]);
      bump("impressions");
    }
  }, [view, loading, next, seen]);

  useEffect(() => {
    mainRef.current?.focus();
    window.scrollTo(0, 0);
  }, [view, step]);

  const go = (v: View) => {
    setView(v);
    setNavOpen(false);
  };
  const openDetails = (id: RecId) => {
    setActiveRec(id);
    bump("clicks");
    go("details");
  };
  const startSetup = () => {
    bump("starts");
    setStep(1);
    setSubmit("idle");
    go("wizard");
  };
  const dismiss = (id: RecId, reason: (typeof dismissReasons)[number]["id"]) => {
    const status: RecStatus = reason === "not_relevant" ? "not_relevant" : reason === "later" ? "snoozed" : "dismissed";
    setStatuses((s) => ({ ...s, [id]: status }));
    setFeedback((f) => [...f, { rec: id, reason: dismissReasons.find((r) => r.id === reason)!.label }]);
    bump("dismissals");
    if (reason === "not_relevant") bump("notRelevant");
  };
  const restore = (id: RecId) => setStatuses((s) => ({ ...s, [id]: "new" }));
  const resetDemo = () => {
    setStatuses(initialStatuses());
    setCounters(initialCounters);
    setSeen([]);
    setFeedback([]);
    setOutcome(null);
    setSubmit("idle");
    setFailNext(false);
    setForceEmpty(false);
    setConfig({ templateId: "gentle", delay: 2, message: templates[0].body, quiet: true, cap: 1 });
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
    go("dashboard");
  };
  const submitSetup = (kind: Outcome) => {
    setSubmit("saving");
    setTimeout(() => {
      if (kind === "activated" && failNext) {
        setFailNext(false);
        setSubmit("error");
        return;
      }
      setOutcome(kind);
      setStatuses((s) => ({ ...s, "abandoned-cart": kind === "activated" ? "activated" : "draft" }));
      if (kind === "activated") bump("activations");
      setSubmit("idle");
      go("success");
    }, 900);
  };

  const navItems: { id: View; label: string; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "recs", label: "Recommendations", badge: next ? "1" : undefined },
    { id: "insights", label: "Insights" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <span className="font-semibold">Cheerio <span className="font-normal text-slate-500">prototype</span></span>
        <Button variant="secondary" aria-expanded={navOpen} aria-controls="sidebar" onClick={() => setNavOpen((o) => !o)}>
          Menu
        </Button>
      </div>
      <aside id="sidebar" className={`${navOpen ? "block" : "hidden"} w-full shrink-0 border-r border-slate-200 bg-white lg:block lg:w-60`}>
        <div className="hidden px-5 py-5 lg:block">
          <div className="text-lg font-semibold">Cheerio</div>
          <div className="text-xs text-slate-500">Design prototype, not the real product</div>
        </div>
        <nav aria-label="Main" className="px-3 pb-3">
          <ul className="space-y-1">
            {navItems.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  aria-current={view === n.id ? "page" : undefined}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${view === n.id ? "bg-emerald-50 font-medium text-emerald-900" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {n.label}
                  {n.badge && <span className="rounded-full bg-emerald-700 px-2 text-xs text-white">{n.badge}</span>}
                </button>
              </li>
            ))}
            {["Campaigns", "Contacts", "Automations", "Chatbots"].map((l) => (
              <li key={l}>
                <span aria-disabled="true" className="flex cursor-not-allowed items-center justify-between px-3 py-2 text-sm text-slate-400" title="Outside this prototype's scope">
                  {l}
                  <span className="text-[10px] uppercase tracking-wide">not built</span>
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <details className="mx-3 mb-4 rounded-md border border-slate-200 p-3 text-sm">
          <summary className="cursor-pointer font-medium text-slate-700">Prototype controls</summary>
          <div className="mt-3 space-y-3 text-slate-700">
            <label className="flex items-start gap-2">
              <input type="checkbox" checked={failNext} onChange={(e) => setFailNext(e.target.checked)} className="mt-1" />
              <span>Make the next activation fail once (to see the error and retry state)</span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" checked={forceEmpty} onChange={(e) => setForceEmpty(e.target.checked)} className="mt-1" />
              <span>Show the no-recommendation state</span>
            </label>
            <Button variant="secondary" className="w-full" onClick={resetDemo}>Reset demo</Button>
          </div>
        </details>
      </aside>

      <main id="main" ref={mainRef} tabIndex={-1} className="min-w-0 flex-1 px-4 py-6 focus:outline-none sm:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm text-slate-500">{business.name} · {business.city} · {business.plan}</p>
            </div>
            <Badge tone="amber">Prototype · synthetic data · nothing is sent</Badge>
          </header>

          {view === "dashboard" && (
            <Dashboard loading={loading} next={next} statuses={statuses} onOpen={openDetails} onDismiss={dismiss} onResume={() => { setActiveRec("abandoned-cart"); setStep(2); go("wizard"); }} onRecs={() => go("recs")} />
          )}
          {view === "details" && <Details id={activeRec} onBack={() => go("dashboard")} onStart={startSetup} />}
          {view === "wizard" && <Wizard step={step} setStep={setStep} config={config} setConfig={setConfig} onBack={() => go("details")} onNext={() => go("review")} />}
          {view === "review" && (
            <Review config={config} submit={submit} failNext={failNext} onBack={() => { setSubmit("idle"); setStep(2); go("wizard"); }} onSubmit={submitSetup} />
          )}
          {view === "success" && outcome && <Success outcome={outcome} next={next} onOpen={openDetails} onHome={() => go("dashboard")} onRecs={() => go("recs")} onResume={() => { setStep(2); go("wizard"); }} />}
          {view === "recs" && <RecList statuses={statuses} feedback={feedback} onOpen={(id) => { setActiveRec(id); go("details"); }} onRestore={restore} />}
          {view === "insights" && <Insights c={counters} />}
        </div>
      </main>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ loading, next, statuses, onOpen, onDismiss, onResume, onRecs }: {
  loading: boolean;
  next: ReturnType<typeof pickNext>;
  statuses: Record<RecId, RecStatus>;
  onOpen: (id: RecId) => void;
  onDismiss: (id: RecId, r: (typeof dismissReasons)[number]["id"]) => void;
  onResume: () => void;
  onRecs: () => void;
}) {
  const [dismissing, setDismissing] = useState(false);
  const [why, setWhy] = useState(false);
  const [reason, setReason] = useState<(typeof dismissReasons)[number]["id"]>("later");
  const draft = statuses["abandoned-cart"] === "draft";
  const activated = statuses["abandoned-cart"] === "activated";
  const totalSent = campaigns.reduce((a, c) => a + c.sent, 0);
  const totalRead = campaigns.reduce((a, c) => a + c.read, 0);
  const totalReplies = campaigns.reduce((a, c) => a + c.replies, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Good morning, {business.owner}</h1>
        <p className="text-sm text-slate-600">Here is how your WhatsApp campaigns are doing.</p>
      </div>

      {loading ? (
        <Card className="space-y-3 p-5" >
          <span className="sr-only" role="status">Loading your recommendation</span>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-9 w-40" />
        </Card>
      ) : draft ? (
        <Card className="border-sky-200 bg-sky-50 p-5">
          <Badge tone="blue">Draft saved, not live</Badge>
          <h2 className="mt-2 text-lg font-semibold">Your abandoned cart reminder is a draft</h2>
          <p className="mt-1 text-sm text-slate-700">It will not send anything until you activate it.</p>
          <div className="mt-4 flex gap-2"><Button onClick={onResume}>Continue setup</Button></div>
        </Card>
      ) : next ? (
        <Card className="border-emerald-200 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="green">Recommended for you</Badge>
            <Badge>{next.rec.feature}</Badge>
          </div>
          <h2 className="mt-3 text-lg font-semibold">{next.rec.title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-700">{next.rec.summary}</p>
          <p className="mt-2 text-sm text-slate-600">
            You have sent {account.campaignsSent} campaigns and have no active automations.{" "}
            <button className="text-emerald-800 underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600" aria-expanded={why} onClick={() => setWhy((w) => !w)}>
              Why am I seeing this?
            </button>
          </p>
          {why && (
            <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
              <p className="font-medium">This appears because all of these are true:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {next.rec.signals(account).map((s) => <li key={s.label}>{s.label}</li>)}
              </ul>
              <p className="mt-2 text-slate-500">Rule: {next.rec.rule}. We only show one suggestion at a time.</p>
            </div>
          )}
          {!dismissing ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => onOpen(next.rec.id)}>See how it works</Button>
              <Button variant="ghost" onClick={() => setDismissing(true)}>Dismiss</Button>
            </div>
          ) : (
            <fieldset className="mt-4 rounded-md border border-slate-200 p-3">
              <legend className="px-1 text-sm font-medium">Help us show better suggestions</legend>
              <div className="space-y-1">
                {dismissReasons.map((r) => (
                  <label key={r.id} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="reason" checked={reason === r.id} onChange={() => setReason(r.id)} />
                    {r.label}
                  </label>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => { onDismiss(next.rec.id, reason); setDismissing(false); }}>Dismiss</Button>
                <Button variant="secondary" onClick={() => setDismissing(false)}>Cancel</Button>
              </div>
              <p className="mt-2 text-xs text-slate-500">You can bring it back anytime from Recommendations.</p>
            </fieldset>
          )}
        </Card>
      ) : (
        <Card className="p-5">
          <h2 className="text-lg font-semibold">{activated ? "No new suggestions right now" : "You have no active suggestions"}</h2>
          <p className="mt-1 text-sm text-slate-600">New suggestions appear when your activity shows a useful next step. Dismissed or saved ones are in Recommendations.</p>
          <div className="mt-3"><Button variant="secondary" onClick={onRecs}>Open Recommendations</Button></div>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Messages sent (3 campaigns)", totalSent.toLocaleString("en-IN")],
          ["Read rate", pct(totalRead, totalSent)],
          ["Replies received", String(totalReplies)],
        ].map(([l, v]) => (
          <Card key={l} className="p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">{l}<SampleTag /></div>
            <div className="mt-1 text-2xl font-semibold">{v}</div>
          </Card>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <div className="flex items-center justify-between px-4 py-3"><h2 className="font-medium">Recent campaigns</h2><SampleTag /></div>
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-y border-slate-200 bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-2 font-medium">Campaign</th><th className="px-4 py-2 font-medium">Sent on</th><th className="px-4 py-2 text-right font-medium">Sent</th><th className="px-4 py-2 text-right font-medium">Read</th><th className="px-4 py-2 text-right font-medium">Replies</th></tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.name} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-2">{c.name}</td><td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2 text-right">{c.sent.toLocaleString("en-IN")}</td>
                <td className="px-4 py-2 text-right">{pct(c.read, c.sent)}</td>
                <td className="px-4 py-2 text-right">{c.replies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-4">
        <h2 className="font-medium">What you are using</h2>
        <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
          <li>✔ Campaigns <Badge tone="green">In use</Badge></li>
          <li>{activated ? "✔" : "○"} Automations {activated ? <Badge tone="green">Active (simulated)</Badge> : <Badge>Not started</Badge>}</li>
          <li>○ Chatbot flows <Badge>Not started</Badge></li>
          <li>○ Customer segments <Badge>Not started</Badge></li>
        </ul>
      </Card>
    </div>
  );
}

/* ---------- Details ---------- */
function Details({ id, onBack, onStart }: { id: RecId; onBack: () => void; onStart: () => void }) {
  const rec = recs.find((r) => r.id === id)!;
  const [carts, setCarts] = useState(Math.round((account.abandonedCarts30d / 30) * 7));
  const [rate, setRate] = useState(5);
  const [aov, setAov] = useState(1150);
  const weekly = (carts * rate) / 100 * aov;
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>← Back to dashboard</Button>
      <div>
        <Badge>{rec.feature}</Badge>
        <h1 className="mt-2 text-2xl font-semibold">{rec.title}</h1>
        <p className="mt-1 max-w-2xl text-slate-700">{rec.summary}</p>
      </div>
      <Card className="p-5">
        <h2 className="font-medium">How it works</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">{rec.how.map((h) => <li key={h}>{h}</li>)}</ol>
      </Card>
      {rec.id === "abandoned-cart" && (
        <>
          <Card className="p-5">
            <div className="flex items-center justify-between"><h2 className="font-medium">What a customer would see</h2><Badge tone="amber">Preview</Badge></div>
            <div className="mt-3"><WhatsAppPreview body={templates[0].body} /></div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between"><h2 className="font-medium">Estimate your upside</h2><Badge tone="amber">Illustrative, edit the numbers</Badge></div>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <label className="text-sm">Abandoned carts per week
                <input type="number" min={0} value={carts} onChange={(e) => setCarts(Math.max(0, Number(e.target.value)))} className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5" />
              </label>
              <label className="text-sm">Carts recovered (%)
                <input type="number" min={0} max={100} value={rate} onChange={(e) => setRate(Math.min(100, Math.max(0, Number(e.target.value))))} className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5" />
              </label>
              <label className="text-sm">Average order value (₹)
                <input type="number" min={0} value={aov} onChange={(e) => setAov(Math.max(0, Number(e.target.value)))} className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5" />
              </label>
            </div>
            <p className="mt-3 text-sm" aria-live="polite">Recovered sales per week: <strong>{inr(weekly)}</strong> <span className="text-slate-500">({carts} × {rate}% × {inr(aov)})</span></p>
            <p className="mt-1 text-xs text-slate-500">Cart count comes from sample data. The recovery rate is your own guess, not a Cheerio benchmark or a promise.</p>
          </Card>
        </>
      )}
      {rec.wizardAvailable ? (
        <div className="flex gap-2"><Button onClick={onStart}>Set up this automation</Button><Button variant="secondary" onClick={onBack}>Not now</Button></div>
      ) : (
        <Card className="border-slate-300 bg-slate-100 p-4 text-sm text-slate-700">The guided setup for this suggestion is outside the MVP scope of this prototype. It shows how the next-best-action queue continues after the first activation.</Card>
      )}
    </div>
  );
}

/* ---------- Wizard ---------- */
type Config = { templateId: string; delay: number; message: string; quiet: boolean; cap: number };
function Stepper({ current }: { current: number }) {
  const steps = ["Template", "Settings", "Review", "Done"];
  return (
    <ol className="flex flex-wrap gap-x-4 gap-y-1 text-sm" aria-label="Setup progress">
      {steps.map((s, i) => (
        <li key={s} aria-current={i + 1 === current ? "step" : undefined} className={i + 1 === current ? "font-semibold text-emerald-800" : i + 1 < current ? "text-slate-700" : "text-slate-400"}>
          {i + 1}. {s}
        </li>
      ))}
    </ol>
  );
}

function Wizard({ step, setStep, config, setConfig, onBack, onNext }: { step: 1 | 2; setStep: (s: 1 | 2) => void; config: Config; setConfig: (c: Config) => void; onBack: () => void; onNext: () => void }) {
  const [touched, setTouched] = useState(false);
  const hasLink = config.message.includes("{{cart_link}}");
  const valid = config.message.trim().length > 0 && hasLink;
  return (
    <div className="space-y-6">
      <Stepper current={step} />
      {step === 1 ? (
        <>
          <h1 className="text-2xl font-semibold">Choose a starting template</h1>
          <p className="text-sm text-slate-600">You can edit the words in the next step.</p>
          <div role="radiogroup" aria-label="Templates" className="space-y-3">
            {templates.map((t) => (
              <label key={t.id} className={`block cursor-pointer rounded-lg border p-4 ${config.templateId === t.id ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                <div className="flex items-start gap-3">
                  <input type="radio" name="tpl" className="mt-1" checked={config.templateId === t.id} onChange={() => setConfig({ ...config, templateId: t.id, message: t.body, delay: t.delayHours })} />
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-slate-600">{t.note}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <WhatsAppPreview body={config.message} />
          <div className="flex gap-2"><Button variant="secondary" onClick={onBack}>Back</Button><Button onClick={() => setStep(2)}>Continue</Button></div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Adjust the settings</h1>
          <Card className="space-y-5 p-5">
            <label className="block text-sm font-medium">When should the reminder go out after someone leaves?
              <select value={config.delay} onChange={(e) => setConfig({ ...config, delay: Number(e.target.value) })} className="mt-1 block w-full max-w-xs rounded border border-slate-300 px-2 py-2 font-normal">
                {[1, 2, 4, 24].map((h) => <option key={h} value={h}>{h} hour{h > 1 ? "s" : ""} after</option>)}
              </select>
              <span className="mt-1 block text-xs font-normal text-slate-500">Shorter is not always better; shoppers may still be browsing.</span>
            </label>
            <label className="block text-sm font-medium">Message
              <textarea rows={4} maxLength={300} value={config.message} onChange={(e) => { setTouched(true); setConfig({ ...config, message: e.target.value }); }} aria-invalid={touched && !valid} aria-describedby="msg-help" className="mt-1 block w-full rounded border border-slate-300 px-2 py-2 font-normal" />
              <span id="msg-help" className={`mt-1 block text-xs font-normal ${touched && !valid ? "text-red-700" : "text-slate-500"}`}>
                {touched && !valid ? "Keep {{cart_link}} in the message so shoppers can return to their cart." : "Keep {{first_name}}, {{product}} and {{cart_link}} as they are; Cheerio fills them in."}
              </span>
            </label>
            <label className="block text-sm font-medium">Most reminders one shopper can get per week
              <select value={config.cap} onChange={(e) => setConfig({ ...config, cap: Number(e.target.value) })} className="mt-1 block w-full max-w-xs rounded border border-slate-300 px-2 py-2 font-normal">
                <option value={1}>1 (recommended)</option><option value={2}>2</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={config.quiet} onChange={(e) => setConfig({ ...config, quiet: e.target.checked })} /> Do not send between 9 pm and 9 am</label>
            <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked disabled /> Only send to customers who have opted in to WhatsApp messages (always on)</label>
          </Card>
          <WhatsAppPreview body={config.message} />
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => { setTouched(true); if (valid) onNext(); }}>Review</Button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Review ---------- */
function Review({ config, submit, failNext, onBack, onSubmit }: { config: Config; submit: "idle" | "saving" | "error"; failNext: boolean; onBack: () => void; onSubmit: (k: Outcome) => void }) {
  const t = templates.find((x) => x.id === config.templateId)!;
  const busy = submit === "saving";
  return (
    <div className="space-y-6">
      <Stepper current={3} />
      <h1 className="text-2xl font-semibold">Review before you finish</h1>
      {submit === "error" && (
        <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <p className="font-semibold">We couldn&apos;t activate this automation.</p>
          <p className="mt-1">Your settings are still here and nothing was changed. You can:</p>
          <ul className="mt-1 list-disc pl-5">
            <li>Try again; this is often a temporary connection problem.</li>
            <li>Save it as a draft now and activate later.</li>
            <li>Go back and check your message and settings.</li>
          </ul>
        </div>
      )}
      <Card className="divide-y divide-slate-100 text-sm">
        {[
          ["Automation", "Abandoned cart reminder"],
          ["Template", t.name],
          ["Sends", `${config.delay} hour${config.delay > 1 ? "s" : ""} after a shopper leaves`],
          ["Limit", `${config.cap} reminder per shopper per week`],
          ["Quiet hours", config.quiet ? "No sends 9 pm to 9 am" : "Off"],
          ["Audience", "Opted-in customers only"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 px-4 py-3"><span className="text-slate-500">{k}</span><span className="text-right font-medium">{v}</span></div>
        ))}
      </Card>
      <WhatsAppPreview body={config.message} />
      <Card className="bg-slate-50 p-4 text-sm text-slate-700">
        <p><strong>Draft vs. active:</strong> a draft is saved but sends nothing. Activating would start sending after WhatsApp template approval. This prototype only simulates both and sends no real messages.</p>
      </Card>
      {failNext && submit !== "error" && <p className="text-xs text-amber-800">Prototype control on: the next activation will fail once.</p>}
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={onBack} disabled={busy}>Back</Button>
        <Button variant="secondary" onClick={() => onSubmit("draft")} disabled={busy}>Save as draft</Button>
        <Button onClick={() => onSubmit("activated")} disabled={busy}>{busy ? "Working…" : submit === "error" ? "Try activating again" : "Activate (simulated)"}</Button>
      </div>
    </div>
  );
}

/* ---------- Success ---------- */
function Success({ outcome, next, onOpen, onHome, onRecs, onResume }: { outcome: Outcome; next: ReturnType<typeof pickNext>; onOpen: (id: RecId) => void; onHome: () => void; onRecs: () => void; onResume: () => void }) {
  const live = outcome === "activated";
  return (
    <div className="space-y-6">
      <Stepper current={4} />
      <Card className={`p-5 ${live ? "border-emerald-300" : "border-sky-300"}`}>
        <Badge tone={live ? "green" : "blue"}>{live ? "Activated (simulated)" : "Draft saved"}</Badge>
        <h1 className="mt-2 text-2xl font-semibold">{live ? "Your abandoned cart reminder is set up" : "Your draft is saved. Nothing is live yet."}</h1>
        <p className="mt-1 text-sm text-slate-700">
          {live ? "In the real product this would now start reminding opted-in shoppers. In this prototype, no automation exists and no messages are sent." : "A draft sends no messages. You can finish and activate it whenever you are ready."}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <div><dt className="text-slate-500">Status</dt><dd className="font-medium">{live ? "Active (simulated)" : "Draft, not sending"}</dd></div>
          <div><dt className="text-slate-500">Messages sent</dt><dd className="font-medium">0 (prototype)</dd></div>
          <div><dt className="text-slate-500">Results</dt><dd className="font-medium">None yet</dd></div>
        </dl>
        {!live && <div className="mt-4"><Button onClick={onResume}>Continue setup</Button></div>}
        <p className="mt-3 text-xs text-slate-500">You can find this again under Recommendations.</p>
      </Card>

      <div>
        <h2 className="mb-2 font-medium">Next recommended action</h2>
        {next ? (
          <Card className="p-5">
            <Badge>{next.rec.feature}</Badge>
            <h3 className="mt-2 text-lg font-semibold">{next.rec.title}</h3>
            <p className="mt-1 text-sm text-slate-700">{next.rec.summary}</p>
            <div className="mt-3"><Button onClick={() => onOpen(next.rec.id)}>See how it works</Button></div>
          </Card>
        ) : (
          <Card className="p-5 text-sm text-slate-600">You are all caught up. We will suggest something new when your activity shows a useful next step.</Card>
        )}
      </div>
      <div className="flex gap-2"><Button variant="secondary" onClick={onHome}>Back to dashboard</Button><Button variant="ghost" onClick={onRecs}>View all recommendations</Button></div>
    </div>
  );
}

/* ---------- Recommendations list ---------- */
const statusLabel: Record<RecStatus, [string, "slate" | "green" | "amber" | "red" | "blue"]> = {
  new: ["Available", "green"], dismissed: ["Dismissed", "slate"], snoozed: ["Remind me later", "amber"],
  not_relevant: ["Marked not relevant", "red"], draft: ["Draft saved", "blue"], activated: ["Activated (simulated)", "green"],
};
function RecList({ statuses, feedback, onOpen, onRestore }: { statuses: Record<RecId, RecStatus>; feedback: { rec: string; reason: string }[]; onOpen: (id: RecId) => void; onRestore: (id: RecId) => void }) {
  const ranked = rank(statuses);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Recommendations</h1>
      <p className="text-sm text-slate-600">Everything we have suggested, including ones you dismissed. Only one is shown on your dashboard at a time.</p>
      <div className="space-y-3">
        {ranked.map(({ rec, score, eligible }) => {
          const [label, tone] = statusLabel[statuses[rec.id]];
          const restorable = ["dismissed", "snoozed", "not_relevant"].includes(statuses[rec.id]);
          return (
            <Card key={rec.id} className="p-4">
              <div className="flex flex-wrap items-center gap-2"><Badge tone={tone}>{label}</Badge><Badge>{rec.feature}</Badge>{!eligible && <Badge tone="amber">Not eligible</Badge>}</div>
              <h2 className="mt-2 font-medium">{rec.title}</h2>
              <p className="text-xs text-slate-500">Relevance score {score.toFixed(2)} · rule: {rec.rule}</p>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" onClick={() => onOpen(rec.id)}>Open</Button>
                {restorable && <Button variant="ghost" onClick={() => onRestore(rec.id)}>Bring back</Button>}
              </div>
            </Card>
          );
        })}
      </div>
      {feedback.length > 0 && (
        <Card className="p-4 text-sm"><h2 className="font-medium">Your feedback this session</h2>
          <ul className="mt-1 list-disc pl-5 text-slate-700">{feedback.map((f, i) => <li key={i}>{recs.find((r) => r.id === f.rec)?.title}: {f.reason}</li>)}</ul>
        </Card>
      )}
    </div>
  );
}

/* ---------- Insights ---------- */
function Insights({ c }: { c: typeof initialCounters }) {
  const s = seededFunnel;
  const rows = [
    ["Eligible accounts", s.eligible, 0],
    ["Recommendation impressions (accounts exposed)", s.impressions, c.impressions],
    ["Recommendation clicks", s.clicks, c.clicks],
    ["Setup starts", s.setupStarts, c.starts],
    ["Successful activations", s.activations, c.activations],
    ["Dismissals", s.dismissals, c.dismissals],
    ["…of which marked not relevant", s.notRelevant, c.notRelevant],
  ] as const;
  const imp = s.impressions + c.impressions;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-semibold">Insights</h1><SampleTag>Illustrative, synthetic data</SampleTag></div>
      <p className="text-sm text-slate-600">The synthetic baseline is made up to show how measurement would look. The &ldquo;your session&rdquo; column counts your clicks in this prototype.</p>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-2 font-medium">Metric</th><th className="px-4 py-2 text-right font-medium">Synthetic baseline</th><th className="px-4 py-2 text-right font-medium">Your session</th><th className="px-4 py-2 text-right font-medium">Total</th></tr></thead>
          <tbody>
            {rows.map(([l, a, b]) => (
              <tr key={l} className="border-b border-slate-100 last:border-0"><td className="px-4 py-2">{l}</td><td className="px-4 py-2 text-right">{a.toLocaleString("en-IN")}</td><td className="px-4 py-2 text-right">{b}</td><td className="px-4 py-2 text-right font-medium">{(a + b).toLocaleString("en-IN")}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Click-through (clicks ÷ impressions)", pct(s.clicks + c.clicks, imp)],
          ["Activation rate (activations ÷ exposed)", pct(s.activations + c.activations, imp)],
          ["Dismissal rate (dismissals ÷ impressions)", pct(s.dismissals + c.dismissals, imp)],
        ].map(([l, v]) => (<Card key={l} className="p-4"><div className="text-xs text-slate-500">{l}</div><div className="mt-1 text-2xl font-semibold">{v}</div></Card>))}
      </div>
      <Card className="p-4 text-sm text-slate-600">Retention impact cannot be shown here. It would need a holdout group measured over time, described in the solution document.</Card>
    </div>
  );
}
