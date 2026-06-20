"use client";

import { useState } from "react";

const BUDGETS = [
  "Less than $1k / month",
  "$1k – $3k / month",
  "$3k – $5k / month",
  "$5k – $10k / month",
  "$10k+ / month",
];

const inputClass =
  "w-full rounded-[var(--rounded-btn)] border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/10";

export default function LeadForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      budget: form.budget.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h3 className="text-2xl font-bold text-glow">Got it. 🎉</h3>
        <p className="mt-3 text-white/60 leading-relaxed">
          Thanks for reaching out. We&rsquo;ll come back to you with a Gen-Z
          content strategy, timeline, and quote, usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl text-left">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-xs text-white/50">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputClass} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-1.5 block text-xs text-white/50">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@brand.com" className={inputClass} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-1.5 block text-xs text-white/50">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+65 …" className={inputClass} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="budget" className="mb-1.5 block text-xs text-white/50">Monthly budget</label>
          <select id="budget" name="budget" defaultValue="" className={inputClass}>
            <option value="" disabled>Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-[#0c0c0c]">{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-xs text-white/50">Who are you trying to reach?</label>
          <textarea id="message" name="message" required rows={4} placeholder="Tell us about your brand, your audience, and your goals." className={`${inputClass} resize-none`} />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-block w-full rounded-[var(--rounded-btn)] border border-white/20 bg-white/10 px-8 py-3 text-base text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send it over"}
      </button>
    </form>
  );
}
