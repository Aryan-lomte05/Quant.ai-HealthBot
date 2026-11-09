# SwasthyaSakha: a multilingual health companion grounded in real clinical reference data

**Health guidance in six Indian languages, answered from scraped and quality-audited NHS reference material
rather than from model memory, with a 3D conversational doctor and audio for users who cannot read comfortably.**

[![Live](https://img.shields.io/badge/live-quant--ai--health--bot.vercel.app-4BC8C0?style=flat-square)](https://quant-ai-health-bot.vercel.app)
[![Languages](https://img.shields.io/badge/languages-6-8B7CF6?style=flat-square)](#six-languages-not-two)
[![Stack](https://img.shields.io/badge/Next.js-React%20Three%20Fiber%20·%20MongoDB-15181D?style=flat-square)](#stack)
[![Not a diagnosis](https://img.shields.io/badge/output-guidance,%20not%20a%20diagnosis-ef4444?style=flat-square)](#this-is-not-a-diagnostic-tool)

**First prize, Periscope 2025.** Built by team HealthFourUs.

A health chatbot that answers from an LLM's memory is a liability: it will produce a confident dosage for a
drug it has half-remembered. SwasthyaSakha instead treats clinical reference text as the source of truth. A
scraping pipeline pulls condition and medicine pages from **NHS.uk**, and, importantly, a separate audit pass
grades every scraped entry and records where the extraction is weak.

That audit (`medicine-audit-report.json`) is the part worth looking at. It flags entries as
`"Generic Dosage"` or `"Generic/Empty Side Effects"`, by name, with the source URL. The system knows which of
its own records are thin, rather than presenting all of them with equal confidence.

---

## This is not a diagnostic tool

Output is **health guidance and reference information**, not diagnosis, and not a prescription. Anything
resembling an emergency routes to the emergency flow and to human help.

---

## Six languages, not two

```ts
export type Language = 'english' | 'hindi' | 'marathi' | 'telugu' | 'tamil' | 'kannada';
```

825 lines of translation keys covering the whole interface, not just the chat window. Paired with
text-to-speech, so a user who cannot read comfortably in any of these scripts can still use the product by
listening, which is the actual accessibility barrier for a large part of the intended audience, and is usually
the first thing dropped from a hackathon build.

## What is in it

| Surface | What it does |
|---|---|
| `/chat` | Conversational health guidance with a selectable 3D doctor avatar (React Three Fiber) |
| `/emergency` | Emergency pathway and escalation to human help |
| `/explore` | Browse conditions, medicines and symptoms from the grounded dataset |
| `/tracking` | Longitudinal personal health tracking |
| `/insights` | Trends derived from tracked data |
| `/family` | Family health profiles |
| `/community` | Peer community threads |
| `/alerts` | Health alerts |
| `/engage` | Engagement and adherence features |
| `/profile`, `/settings` | Account, language and accessibility preferences |

### API

`/api/chat/web`, `/api/diseases`, `/api/medicines`, `/api/symptoms`, `/api/tts`, `/api/community`,
`/api/user`, and a phone-based auth flow (`send-otp`, `verify-otp`, `login`, `signup`) using JWT and bcrypt,
OTP rather than passwords, because the target user is on a phone and will not maintain a password.

### The data pipeline

`scripts/` is the unglamorous half of the project and the reason the answers hold up:

| Script | Job |
|---|---|
| `scrape-nhs-data.ts` | Pulls conditions and medicines from NHS.uk (Puppeteer + Cheerio, rate-limited with `p-limit`) |
| `audit-medicines.ts` | Grades every scraped record and writes `medicine-audit-report.json` |
| `fix-gaps.ts`, `repair-gaps.ts` | Re-fetch and repair records the audit flagged |
| `verify-integration.ts`, `verify-search.ts` | Assert the data is actually reachable through the app and its search |
| `test-nhs-api.ts`, `debug-*.ts` | Source-level debugging for individual pages |

## Stack

Next.js (App Router) · React Three Fiber + Drei for the 3D avatars · MongoDB via Mongoose · Zustand ·
TanStack Query · Zod + React Hook Form · Framer Motion + Lenis · ElevenLabs TTS
(see [`ELEVENLABS_TTS_SETUP.md`](ELEVENLABS_TTS_SETUP.md)).

## Running it

```bash
npm install
cp env.example .env.local      # Mongo URI, JWT secret, TTS and model keys
npm run dev
```

Rebuild the grounded dataset with `npx tsx scripts/scrape-nhs-data.ts`, then
`npx tsx scripts/audit-medicines.ts` to regenerate the audit report.

---

## Status and honest limits

A hackathon-winning prototype, in active shape but not a medical product.

- **The reference data is NHS (United Kingdom).** It is high quality and well structured, which is why it was
  chosen, but it is not the Indian national formulary: brand names, availability and some dosing conventions
  differ from what an Indian user will find at a chemist. Substituting or supplementing with an Indian source
  is the most valuable next step.
- **The audit reports gaps; it does not fix them all.** Entries flagged `Generic Dosage` are still served, and
  they should be visibly marked as incomplete in the interface rather than only in the report file.
- **Translations are not clinically reviewed.** Interface coverage across six languages is complete; the
  medical accuracy of translated guidance has not been checked by a clinician in each language.
- **No clinical validation and no clinician in the loop** beyond the emergency escalation path.
- **The scrape depends on NHS.uk page structure** and will need maintenance when that changes.

---

## Team

**HealthFourUs**: Aryan Lomte, Shivam Verma, Aditya Yadav, Sujal Thakkar. First prize, Periscope 2025.

Related: the multi-agent medical backend lives in
[Agentfoundry](https://github.com/Aryan-lomte05/Agentfoundry).
