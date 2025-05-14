# 🧩 6 Devs, 1 Project

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
