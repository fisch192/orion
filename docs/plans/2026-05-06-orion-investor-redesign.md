# Orion Investor Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy a premium Orion PDA investor/preorder site.

**Architecture:** A Vite React static site renders the landing page, product proof sections, Three.js animated hero layer, and a client-side order/investor contact flow. Product images from the existing website live under `public/assets`.

**Tech Stack:** React 19, TypeScript, Vite, Three.js, lucide-react, Vitest, CSS.

---

### Task 1: Project Foundation

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`

**Steps:**
1. Add Vite React scripts and dependencies.
2. Add TypeScript and Vitest configuration.
3. Install dependencies with `npm install`.
4. Run the initial Vitest test and confirm the missing implementation fails.

### Task 2: Order Flow

**Files:**
- Create: `src/lib/order.test.ts`
- Create: `src/lib/order.ts`

**Steps:**
1. Write a failing test for the encoded order/investor email link.
2. Implement `buildOrderMailto`.
3. Run `npm test` and verify the test passes.

### Task 3: Investor Site UI

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/components/SignalScene.tsx`
- Create: `src/styles.css`

**Steps:**
1. Build the page sections from static data arrays.
2. Add the Three.js signal animation with mount/unmount cleanup.
3. Add responsive CSS for desktop and mobile.
4. Run `npm run build`.

### Task 4: Publish and Deploy

**Files:**
- All project files.

**Steps:**
1. Initialize git if needed.
2. Commit the redesign.
3. Create or update the GitHub remote.
4. Push the branch.
5. Deploy to Vercel preview and capture the working URL.
