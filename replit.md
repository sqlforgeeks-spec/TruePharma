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
  images/
    hero1-4.png          # hero slideshow images
    products/            # all product images (real catalogue photos + AI-generated Kamagra)
```

## Key features
- **Product image ticker** above the navbar — all 23 product images scroll horizontally (pauses on hover)
- Sticky navbar with **product brand dropdowns** (Featured, Vidalista, Fildena, Vilitra, Cenforce & Kamagra)
- Auto-rotating **hero image slideshow** using the 4 uploaded product images
- **Product grid** with real product photos, brand filters + Download Catalogue button
- **Enquiry modal** — product picker, quantity, message → sends via WhatsApp / Telegram / Email
- Fixed floating **WhatsApp + Telegram buttons** with pulse/bounce animation
- Payments section: PayPal, USDT, Bitcoin, Bank Transfer
- Footer with Telegram, Instagram, WhatsApp, Mail social icons

## Products (23 total, all with real images)
- **Vidalista** (9): Vidalista 5, 10, 20, CT, Professional, 60, 80, Black 80, Super Vidalista
- **Fildena** (4): Fildena 100, Strong 120, Professional, Super Active
- **Vilitra** (3): Vilitra 20, 40, 60
- **Cenforce** (3): Cenforce 50, 150, Soft-100
- **Kamagra** (4): Kamagra 100, Oral Jelly, Effervescent, Polo (AI-generated images)

## Product images
Stored in `public/images/products/` — real catalogue photos from user-uploaded assets for all non-Kamagra products; AI-generated for Kamagra.

## Deployment (GitHub Pages)
Build with `npm run build` — the output `dist/index.html` is fully self-contained and can be deployed directly to GitHub Pages.
Note: The vite-plugin-singlefile bundles JS/CSS inline but **does not inline images** — for a GitHub Pages deploy with images, keep the `public/images/` folder alongside `dist/index.html`.

## User preferences
- Keep product enquiry modal simple: no name/phone/email fields
- Floating CTA buttons should have pulse/bounce animation
- Hero section uses real product images from `public/images/`
- No certification badges (WHO-GMP, ISO 9001, FDA Reg.) — removed from all sections
- Countries metric: 25+ (not 50+)
- No "1000+ Distributors" stat anywhere
