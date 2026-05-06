# Orion Investor Redesign Design

## Goal

Rebuild Orion's public site as a premium investor and preorder experience that makes the product feel fundable, tactile, and immediately actionable.

## Direction

The first viewport will lead with the product name, the real Orion device imagery from `orionpda.org`, a concise investor-grade claim, and a visible reservation/investor action. The page will use a restrained high-value SaaS aesthetic: crisp typography, dark product contrast, warm metal accents, cyan technical highlights, dense proof points, and no generic startup fluff.

## Structure

- Hero: full-bleed product image, animated Three.js signal field, launch metrics, and primary investor/order calls to action.
- Product proof: three focused value pillars for private computing, long-form writing, and developer openness.
- Visual product section: real hand/device and PCB images from the current website.
- Investor section: market narrative, defensibility, milestones, and a compact lead form.
- Order section: static client-side form that opens an encoded email to `hello@orion.pda`.

## Technical Approach

Use Vite, React, TypeScript, CSS, `three`, and `lucide-react`. Keep the Three.js scene isolated in one component with cleanup on unmount and reduced-motion support. Use static assets in `public/assets` so Vercel can serve the build without a backend.
