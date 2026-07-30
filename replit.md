# TruePharma / AlphaVigor — Product Catalogue Website

A static single-page pharmaceutical product catalogue for TruePharma & AlphaVigor, built with React + Vite + Tailwind CSS v4.

## Stack
- **React 19** + TypeScript
- **Vite 7** (dev server + build)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **vite-plugin-singlefile** — bundles everything into one `index.html` for GitHub Pages

## Running locally
```bash
npm run dev      # dev server on port 5000
npm run build    # outputs dist/index.html (self-contained single file)
npm run preview  # preview the production build
```

## Structure
```
src/
  App.tsx        # entire app (single component file)
  main.tsx       # React entry point
  index.css      # global styles
  utils/cn.ts    # classname helper
public/
  images/        # hero product showcase images (hero1-4.png)
```

## Key features
- Sticky navbar with **product brand dropdowns** (Featured, Vidalista, Fildena, Vilitra, Cenforce & Kamagra)
- Auto-rotating **hero image slideshow** using the 4 uploaded product images
- **Product grid** with brand filters + Download Catalogue button
- **Enquiry modal** — product picker, quantity, message → sends via WhatsApp / Telegram / Email
- Fixed floating **WhatsApp + Telegram buttons** with pulse animation
- Payments section: PayPal, USDT, Bitcoin, Bank Transfer
- Footer with Telegram, Instagram, WhatsApp, Mail social icons

## Deployment (GitHub Pages)
Build with `npm run build` — the output `dist/index.html` is fully self-contained and can be deployed directly to GitHub Pages.

## User preferences
- Keep product enquiry modal simple: no name/phone/email fields
- Floating CTA buttons should have pulse/bounce animation
- Hero section uses real product images from `public/images/`
