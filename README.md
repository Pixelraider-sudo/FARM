# AgriSense — redesigned (React + TypeScript)

A ground-up redesign of the original HTML/CSS/JS AgriSense site.

## Stack
React 18 · TypeScript (strict) · Vite · React Router 6 · Tailwind CSS v4 · Framer Motion · lucide-react

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build -> dist/
```

## Structure
```
src/
  data/        typed datasets (crops, livestock, diseases, articles, market, pests) + images.ts + static.ts
  types/       shared domain types
  lib/         storage (localStorage CRUD), planner, chat, utils
  hooks/       useCollection, useNotifications, useTheme
  components/  ui/ (primitives), layout/ (navbar, footer), chat/
  pages/       one file per route (lazy-loaded)
```

## Images
All imagery is loaded from the web (Unsplash scenes, Wikimedia where the original data had it,
keyword-matched stock photos otherwise). Each image has a fallback chain, then a painted placeholder.
Edit `src/data/images.ts` to swap sources.

## AI chat
Works offline out of the box (answers from the on-site knowledge base). To use a real model, point
`VITE_CHAT_ENDPOINT` (see `.env.example`) at your own backend that holds the Gemini key and accepts
`POST { history, message, system } -> { reply }`. Never ship an API key in browser code.

## Not real yet
Login/Register/Contact submit to stubs (`TODO` in `pages/Auth.tsx`, `pages/Contact.tsx`); market prices are
illustrative; farms/finance/inventory/community persist to localStorage only.
