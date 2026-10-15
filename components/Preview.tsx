export function fill(body: string) {
  return body
    .replace("{{first_name}}", "Priya")
    .replace("{{product}}", "Vitamin C Serum 30 ml")
    .replace("{{cart_link}}", "kaverinaturals.example/cart/abc123");
}

export function WhatsAppPreview({ body }: { body: string }) {
  return (
    <figure className="rounded-lg bg-[#e7efe9] p-4" aria-label="Message preview, not sent">
      <div className="max-w-[300px] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm leading-relaxed text-slate-800 shadow-sm">
        {fill(body)}
        <div className="mt-1 text-right text-[10px] text-slate-400">preview</div>
      </div>
      <figcaption className="mt-2 text-xs text-slate-600">
        Preview with sample values. Nothing is sent from this prototype.
      </figcaption>
    </figure>
  );
}
