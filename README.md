# 🧩 6 Devs, 1 Project

> **Note:** Developers should reference the [Mistral API documentation](https://docs.mistral.ai/api/) for details on available endpoints, request formats, and model usage.
>
> **OCR Model:** This project uses the [`mistral-ocr-latest`](https://docs.mistral.ai/capabilities/document/#tag/ocr/operation/ocr_v1_ocr_post) model for document OCR. It extracts structured text from PDFs and images, preserving formatting and returning results in markdown. See the [OCR documentation](https://docs.mistral.ai/capabilities/document/#tag/ocr/operation/ocr_v1_ocr_post) for details and usage examples.

Welcome to **6 Devs, 1 Project** — a collaborative experiment where **six developers** team up to build **one product** in a high-energy, relay-style format. Think of it as a dev jam meets reality show meets Product Hunt launch.

---

## 🚩 Project Selection & MVP (Dev #1: Ray Fernando)

**Selected Project:**

### Document Translator (Image/PDF → AI-Powered Translation)

Upload an image or PDF, extract the text using AI (OCR), and translate it into another language. The result is a shareable link to the translated document.

**Why?**

- Solves a real pain point for translating documents (e.g., medical PDFs, forms, etc.)
- Leverages the latest AI models for both OCR and translation
- Simple, useful, and extensible for future features

---

## 🎯 Who Is This For? (Target Persona & Market Fit)

This project is designed for travelers, expats, and digital nomads who urgently need to translate official documents—especially medical records—while abroad. The primary persona is the "Emergency-Docs Abroad" traveler:

- **Profile:** A tech-savvy, mid-30s professional from the U.S., U.K., Canada, Australia, or Western Europe, often traveling for leisure or work. They store documents in Google Drive/iCloud, pay online, and expect mobile-first solutions.
- **Typical Scenario:** After an accident or sudden illness abroad, they're discharged with medical paperwork in a foreign language. Their insurer and home doctor require English records _immediately_ to process claims or approve travel.
- **Pain Points:**
  - High cost and slow turnaround from traditional translation agencies ($35–$150/page, 3–5 days)
  - Google Translate/DeepL can't handle medical jargon or handwritten notes
  - Privacy concerns about emailing sensitive records
  - Need for fast, clear, and insurer-ready translations (ideally <1 hour)
  - Often working from a phone, not a laptop
- **Market Signals:**
  - 7% of leisure travelers need medical care abroad; 1% are hospitalized
  - 3M+ U.S. travelers/year engage with foreign healthcare
  - 90k–110k global searches/month for document translation keywords

**Jobs-To-Be-Done:**

- "I need this French discharge summary in plain English _before tomorrow's follow-up call_."
- "My insurer requires documentation in English or they'll deny my claim."
- "My hometown doctor must review my x-ray report to advise if I can fly."

**What They Value:**

- Speed (<1 hour turnaround)
- Clarity (plain English + original terms)
- Data security (auto-delete, encrypted)
- Price transparency (flat per-page or upfront quote)
- Mobile-first, one-tap upload

For more details, see `marketing-docs/landing-page-copy-ideas.md` for the full persona, pain points, and market research.

**MVP Feature List:**

- Upload an image (JPEG/PNG) or PDF
- Extract text from the document using AI (OCR via Mistral model)
- Detect the source language
- Translate the extracted text to a user-selected target language
- Store the original and translated text in a Vercel blob store
- Generate a shareable link for the translated document
- Simple, user-friendly UI

**Tech Stack:**

- Next.js (App Router)
- React (with functional components)
- Tailwind CSS (for styling)
- Vercel AI SDK (using the Mistral model for OCR and translation)
- Vercel Blob Store (for file storage and shareable links)

**Design Direction:**

- Clean, minimal, and accessible
- Focus on clarity and ease of use
- Responsive and mobile-friendly

**Handoff Plan for Dev #2:**

- Frontend skeleton is in place (see `app/`, `components/`)
- File upload, language selection, and result display are implemented
- Backend logic for processing documents is in `app/actions.ts`
- See below for more details on project structure and workflow

---

## 🧠 Project Overview & Structure

### How It Works

1. **User uploads** an image or PDF via the UI.
2. The file is **uploaded to Vercel Blob Store** and a public URL is generated.
3. The **Vercel AI SDK (Mistral model)** is used to:
   - Extract text from the file (OCR)
   - Detect the source language
   - Translate the text to the selected target language
4. The **results** (original and translated text, languages, shareable link) are displayed to the user and can be shared.

### Key Files & Directories

- `app/` — Main application code, including routes and backend actions
  - `actions.ts` — Handles file upload, AI processing, translation, and link generation
  - `share/[id]/` — (Demo) Route for viewing shared documents
- `components/` — UI components
  - `file-uploader.tsx` — Handles file selection, validation, and upload
  - `results-display.tsx` — Shows translation results and sharing options
  - `language-selector.tsx` — Dropdown for selecting target language
- `lib/` — Utility functions (future expansion)
- `public/` — Static assets
- `styles/` — Global styles
- `package.json` — Dependencies (see Vercel AI SDK, Mistral, Blob, etc.)
- `README.md` — This file! (Always up to date for onboarding)

For more details, see the [Project Structure Guide](.cursor/rules/project-structure.mdc) and [Vercel AI SDK Usage Guide](.cursor/rules/vercel-ai-sdk-usage.mdc).

---

## 🛠️ Implementation Details

- **Vercel AI SDK** is used for both OCR (extracting text from images/PDFs) and translation, with the **Mistral model** as the engine.
- **Vercel Blob Store** is used to store uploaded files and generate public, shareable links.
- The backend logic is in `app/actions.ts` and is called from the frontend via the file uploader component.
- The UI is built with reusable components and is ready for further design/branding work.

---

## 🏃 Next Steps for Developers

- **Dev #2:**
  - Refine the frontend skeleton, improve UX, and ensure smooth file upload/processing flow.
  - Add error handling, loading states, and polish the UI.

### 1. Snapshot of the Competitive Landscape

| Service                     | Core Pitch                               | OCR Quality                                        | Formatting Preserved                    | Turn-around Speed                          | Privacy Posture                                     | Pricing Signal                               | Mobile-First?                   | Notes for Differentiation                                                                        |
| --------------------------- | ---------------------------------------- | -------------------------------------------------- | --------------------------------------- | ------------------------------------------ | --------------------------------------------------- | -------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| **DeepL PDF**               | “Unrivaled accuracy”                     | Good (extracts text, warns about image-heavy PDFs) | Yes—markets “all formatting maintained” | Manual upload → download; account required | Pro plans promise auto-deletion after translation   | Free ≤ 5 MB, Pro tiers up to 30 MB           | Desktop, mobile apps            | Best-in-class quality, but gate-keeps bigger files & fastest flow behind paywall ([DeepL][1])    |
| **Smallpdf Translator**     | “Instant summaries or full translations” | Auto-OCR on images & scans                         | Partial—images/layout may drop          | One-click web tool, no signup              | TLS, GDPR/ISO badges; no explicit auto-delete timer | Free + 7-day unlimited trial; upsells bundle | Fully browser/mobile responsive | Very low friction; leverages brand trust of 1.7 B users ([Smallpdf][2])                          |
| **DocTranslator**           | Low-cost bulk word pricing               | Uses Google/AI OCR                                 | Keeps layout (outputs same format)      | Async—email link when ready                | 24-h file storage on free tier                      | \$0.005/word; storage & Pro tiers            | Web only                        | Price transparency but dated UI; 24 h retention may worry health-data users ([DocTranslator][3]) |
| **Google Translate (app)**  | Free, universal languages                | Live-camera OCR                                    | No formatting; plain text               | Real-time camera or photo                  | Data tied to Google account                         | Free                                         | Mobile-first                    | Great for snippets, poor for multi-page docs ([Google Play][4])                                  |
| **Scan & Translate+ (iOS)** | “Cheaper & faster than others”           | OK for quick grabs                                 | No                                      | Real-time                                  | Unclear (consumer app)                              | Freemium                                     | Mobile only                     | Consumer focus; no shareable doc link ([Apple][5])                                               |

**Gaps we can own**

1. **< 1-hour SLA** for entire multi-page PDFs (Smallpdf doesn’t promise a clock; DeepL throttles size).
2. **Medical-grade privacy**: instant encryption + auto-delete timer (DeepL reserves for Pro; competitors vague).
3. **Share-ready link** that carries *both* source & translated text with layout preview (none do both).
4. **Handwriting / mixed layout tolerance** via the new `mistral-ocr-latest` model.
5. **Mobile-optimized one-hand flow** tuned for “injured traveler” scenarios, not desktop office users.

---

### 2. Design Principles & Justifications

| Principle                                | Why It Matters (User & Competitor Insight)                                                                                                                                          | Implementation Notes                                                                                                              |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Clarity-First UI**                     | Emergency-docs persona is stressed, using a phone; must see *one obvious action* (“Upload & Translate”). Smallpdf’s single-drop zone outperforms DocTranslator’s multi-step wizard. | Hero section with drag-and-drop **card** + capture-from-camera button. Keep other options (history, pricing) behind a kebab menu. |
| **Perceived Speed**                      | DeepL & DocTranslator leave users in a black-box wait. Showing progress lowers abandonment.                                                                                         | Inline progress bar (“Scanning 3 pages… 12 s remaining”), optimistic UI that pre-loads share link skeleton.                       |
| **Trust & Privacy Signals**              | Healthcare docs demand HIPAA-like confidence. Smallpdf relies on badges; we add a visible *Auto-delete in 24 h* chip under the upload zone.                                         | Lock icon + tooltip linking to privacy policy; optional toggle for “delete on download”.                                          |
| **Side-by-Side Viewer**                  | DeepL forces a file download. A live viewer lets users skim for errors before sharing.                                                                                              | Two-pane scroll-locked view (original left, translation right), with copy & “Flag mistranslation” CTA.                            |
| **One-Tap Reshare**                      | Travelers often forward to insurer/doctor via WhatsApp/email.                                                                                                                       | Generate `https://docx.ai/s/<id>` link with built-in viewer and PDF export; share sheet on mobile.                                |
| **Accessibility & Internationalisation** | Target market spans locales; color contrast and language fallback vital.                                                                                                            | WCAG AA contrast ratios, dynamic RTL layout when target language is Arabic/Hebrew.                                                |

---

### 3. Recommended Visual Palette & Typography

| Token               | Hex       | Usage                           | Rationale\*                                                                                                   |
| ------------------- | --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Primary Blue**    | `#0D6EF9` | Headers, primary buttons        | Blue is most trusted hue in healthcare & fintech; evokes security and calm ([Progress.com][6], [LinkedIn][7]) |
| **Healing Teal**    | `#00CEC8` | Secondary buttons, progress bar | Blue-green links to vitality & care; complements primary without competing ([Figma][8])                       |
| **Safety Gray-900** | `#1F2937` | Body text                       | High-contrast, avoids pure black strain                                                                       |
| **Neutral Gray-50** | `#F8FAFC` | Background panels               | Clean, clinical whitespace                                                                                    |
| **Alert Amber**     | `#FFB547` | CTA accents, delete timer chip  | Warm accent for urgency (upload, share) without red-flag anxiety ([InspiringApps][9])                         |

\*Color-psychology sources highlight blue/green for calm trust and a warm accent for attention without stress.

**Font stack:** `Inter, ui-sans-serif, system-ui` – widely supported, high legibility at small sizes.

---

### 4. UX Flow (Mobile-First Wire Outline)

1. **Landing / Hero**

   * Logo + tagline
   * Upload card (tap to pick file or “Scan with camera”)
   * Language auto-detect pill → dropdown for target language
2. **Processing Screen**

   * Circular progress with percentages
   * File thumbnail, page count, “Cancel” link
3. **Results Screen**

   * Top: success ribbon + auto-delete countdown (amber chip)
   * Two-pane viewer (toggle “Side-by-side / Stacked”)
   * Sticky footer: Copy translation | Download PDF | Share Link
4. **Share View (`/s/[id]`)**

   * Read-only viewer with same palette
   * “Request fresh translation” button if expired
5. **Error States**

   * Friendly illustrations (paper plane crash)
   * Retry / contact support links

---

### 5. Canva AI Brief (copy-paste ready)

> **Project:** “Document Translator – Emergency Medical PDFs”
> **Mood:** Calm trust, clinical clarity, light urgency
> **Primary Colors:**
> – Trust Blue `#0D6EF9` (buttons & headings)
> – Healing Teal `#00CEC8` (highlights, progress)
> – Neutral Gray 50 `#F8FAFC` (background)
> – Text Gray 900 `#1F2937` (body text)
> – Accent Amber `#FFB547` (CTA accent, countdown chip)
> **Typography:** Inter – SemiBold (headings), Regular (body)
> **Key Components to Mock:**
>
> 1. Mobile upload card with drag-drop + camera icon
> 2. Processing screen with circular progress + teal ring
> 3. Side-by-side viewer card (blue header bar)
> 4. Share-link banner with amber CTA button
>    **Imagery Style:** Crisp line icons, subtle gradients (teal-blue), lots of whitespace, rounded 12 px corners.
>    **Overall Vibe:** Modern, accessible, hospital-grade trust but startup-fresh energy.

---

#### Next Steps

* **Dev #2** can implement the color tokens in Tailwind (`tailwind.config.ts` – extend colors).
* Add the countdown privacy chip component and progress UI.
* **Designers** can use the Canva brief to spin up hero graphics and component mock-ups for review.

This foundation positions us squarely between the accuracy of DeepL and the ease of Smallpdf, while owning **speed**, **medical-grade privacy**, and a **mobile emergency flow**.

[1]: https://www.deepl.com/en/features/document-translation/pdf "Translate PDF documents instantly with DeepL"
[2]: https://smallpdf.com/translate-pdf "Online PDF Translator | Translate PDFs to any language for free"
[3]: https://doctranslator.com/pricing "Best Translation Pricing ⭐️ DocTranslator"
[4]: https://play.google.com/store/apps/details?hl=en_US&id=com.google.android.apps.translate&utm_source=chatgpt.com "Google Translate - Apps on Google Play"
[5]: https://apps.apple.com/us/app/scan-translate-text-grabber/id845139175?utm_source=chatgpt.com "Scan & Translate+ Text Grabber 4+ - App Store"
[6]: https://www.progress.com/blogs/using-color-psychology-healthcare-web-design?utm_source=chatgpt.com "Using Color Psychology for Healthcare Web Design"
[7]: https://www.linkedin.com/pulse/using-color-ux-healthcare-aaron-usiskin-0nbwe?utm_source=chatgpt.com "Using Color in UX / Healthcare - LinkedIn"
[8]: https://www.figma.com/colors/blue-green/?utm_source=chatgpt.com "Blue-Green Color: Hex Code, Palettes & Meaning - Figma"
[9]: https://www.inspiringapps.com/blog/the-importance-of-color-in-design?utm_source=chatgpt.com "The Psychology of Color in Branding Digital Products | InspiringApps"


- **Dev #3:**
  - Add design and branding (colors, logo, typography, etc.).
- **Dev #4:**
  - Expand backend/API logic, add database or persistent storage if needed, and improve shareable link functionality.
- **Dev #5:**
  - Implement authentication and security best practices.
- **Dev #6:**
  - QA, bug fixes, and prepare for launch/demo.

---

## 🌟 Project Values

- **Creativity > Perfection**: Done is better than perfect.
- **Collaborative Spirit**: Each dev builds on the last.
- **Transparency**: Leave clear documentation and reasoning behind every decision.
- **Vibes Welcome**: This is meant to be fun. Bring your weird.

---

## ⏱ Relay Format

Each developer gets ~2 hours to work before handing off. Here's the full relay breakdown:

| Dev # | Role                                       |
| ----- | ------------------------------------------ |
| 1     | Planning (Concept + MVP + PDR) ✅          |
| 2     | Frontend skeleton                          |
| 3     | Design & branding                          |
| 4     | Backend & APIs                             |
| 5     | Auth & security                            |
| 6     | QA, launch, and prep for Product Hunt/demo |

All work is streamed or recorded for a final YouTube recap.

---

## 🎥 Final Product

At the end, we'll have:

- A working MVP
- A full build journey recorded
- A 20-minute video documenting the entire project
- A public repo and possibly a **Product Hunt launch**

---

## 🚀 Let's Build Something Unexpected.

Questions? DM the project lead or open an issue in the repo. Otherwise — grab your turn, review the PDR, and let's ship some magic.
