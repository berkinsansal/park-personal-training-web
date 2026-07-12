# UI Component Migration Plan

**Project:** Park Personal Training Web  
**Stack:** Next.js 16.2.6 / React 19.2.4 / Tailwind v4 / next-intl 4  
**Component library target:** shadcn/ui (Tailwind v4 CSS-variable path)

---

## Context

The codebase is hand-rolled Tailwind CSS with no component library. Every interactive component in `(home)` and `(public)` is already a client component. The only server components on the public side are `Footer.tsx` (async, no interactive children), the public `(public)/layout.tsx`, and the admin `page.tsx` / `layout.tsx`.

### Problems found by audit

| Problem | Severity | Location |
|---|---|---|
| `useCountUp` called inside `.map()` — Rules of Hooks violation | **Bug** | `AboutPreview.tsx`, `About.tsx` |
| Primary CTA class string copy-pasted 7+ times | High | 13 files |
| `StatCard` JSX + `useCountUp` implementation duplicated verbatim | High | `AboutPreview.tsx` ↔ `About.tsx` |
| `TrainerCard` JSX + `getInitials()` duplicated verbatim | High | `TrainersPreview.tsx` ↔ `Trainers.tsx` |
| Three incompatible input field class strings | Medium | Admin panels, LoginForm, ContactForm, SiteInfoForm |
| Contact info card row repeated 4× inline | Medium | `Contact.tsx` |
| WhatsApp SVG copy-pasted in 4 locations | Medium | Navbar (×2), ContactPreview, ContactPhoneDialog |
| Global unscoped `<style>` tag with bare class names | Medium | `ContactPhoneDialog.tsx` |
| `text-black` used once — every other amber-bg element uses `text-zinc-950` | Low | `Playlists.tsx` |
| `AboutPreview.tsx` uses `py-24`, `About.tsx` uses `py-16` | Low | About components |

### Server/client boundary inventory

No batch in this plan converts any component between server and client rendering.

| File | Rendering | Notes |
|---|---|---|
| `Footer.tsx` | **Server** | Must not receive interactive shadcn components |
| `(public)/layout.tsx` | **Server** | Fetches siteInfo, passes to Navbar |
| `admin/page.tsx` | **Server** | Renders panel client components as children |
| `admin/layout.tsx` | **Server** | Wrapper only |
| All `(home)/_components/` | Client | Already `'use client'` |
| All `(public)/*/components/` | Client | Already `'use client'` |
| All admin panel components | Client | Already `'use client'` |

---

## Batch 0 — shadcn/ui Initialization (Tailwind v4)

**Scope:** XS | **Dependencies:** none | **Boundary changes:** none

### Goals

- Install `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`.
- Run `npx shadcn@latest init` (Tailwind v4 path — no `tailwind.config.ts`).
- Expand `:root` in `app/globals.css` with 16 semantic tokens mapped to the amber/zinc palette.
- Create `lib/utils.ts` with `cn()`.

### CSS token values (correct these after CLI init — CLI defaults will not match the palette)

```css
:root {
  --background:            #09090b;   /* zinc-950 — existing */
  --foreground:            #fafafa;   /* existing */
  --card:                  #18181b;   /* zinc-900 */
  --card-foreground:       #fafafa;
  --popover:               #18181b;
  --popover-foreground:    #fafafa;
  --primary:               #fbbf24;   /* amber-400 — brand color */
  --primary-foreground:    #09090b;   /* zinc-950 — text on amber */
  --secondary:             #27272a;   /* zinc-800 */
  --secondary-foreground:  #fafafa;
  --muted:                 #27272a;
  --muted-foreground:      #a1a1aa;   /* zinc-400 */
  --accent:                #fbbf24;
  --accent-foreground:     #09090b;
  --destructive:           #f87171;   /* red-400 */
  --border:                #3f3f46;   /* zinc-700 */
  --input:                 #27272a;
  --ring:                  #fbbf24;
  --radius:                0.5rem;    /* rounded-lg */
}
```

### Candidate files

- `app/globals.css` — expand `:root`, add `@theme inline` block
- `lib/utils.ts` — new (CLI generated)
- `components.json` — new (CLI generated)
- `package.json` — 4 new deps

### Risks

- CLI may overwrite `--background`/`--foreground` with shadcn defaults — restore `#09090b`/`#fafafa` after.
- CLI may add a conflicting `@layer base` body reset — preserve `font-family: var(--font-geist-sans)` and `scroll-behavior: smooth`.
- Do NOT let the CLI create `tailwind.config.ts`.

### Validation

1. `npm run build` passes.
2. Site renders visually identically.
3. No `tailwind.config.ts` created.
4. `cn('bg-amber-400', 'bg-zinc-950')` resolves to `bg-zinc-950` (tailwind-merge dedup).

### Rollback

Revert `app/globals.css`. Delete `lib/utils.ts`, `components.json`. Remove 4 packages.

### Definition of done

`lib/utils.ts` exports `cn()`. `components.json` has `cssVariables: true` and empty `tailwind.config`. `:root` has all 16 tokens at the amber/zinc values above.

### Automatable

CLI handles everything. The color value correction is one manual edit.

---

## Batch 1 — Correctness Fix: Hooks-in-Loop + Shared Hook + WhatsApp Icon

**Scope:** S | **Dependencies:** Batch 0 | **Boundary changes:** none

### Goals

1. **Fix React Rules of Hooks violation** — `useCountUp` is called inside `.map()` in `AboutPreview.tsx` (~line 101) and `About.tsx` (~line 144). Illegal in React 19 Strict Mode.
2. Extract `useCountUp` into `lib/hooks/use-count-up.ts`.
3. Extract the copy-pasted WhatsApp SVG into `components/ui/whatsapp-icon.tsx`.

### Fix for hooks violation

Create a `<StatCounter>` sub-component that owns its own `useCountUp` call internally. The parent maps over the stats array and renders `<StatCounter target={n} suffix="+" label="..." active={statsVisible} />`. The IntersectionObserver stays in the parent; `StatCounter` receives `active: boolean` only.

### WhatsApp SVG locations (4 copy-paste sites)

- `app/[locale]/_components/Navbar.tsx` — desktop (~line 49) and mobile (~line 174)
- `app/[locale]/(home)/_components/ContactPreview.tsx` — ~line 33
- `app/[locale]/(public)/contact/_components/ContactPhoneDialog.tsx` — ~line 148

### Candidate files

- **New:** `lib/hooks/use-count-up.ts`
- **New:** `components/ui/whatsapp-icon.tsx`
- `app/[locale]/(home)/_components/AboutPreview.tsx`
- `app/[locale]/(public)/about/_components/About.tsx`
- `app/[locale]/_components/Navbar.tsx`
- `app/[locale]/(home)/_components/ContactPreview.tsx`
- `app/[locale]/(public)/contact/_components/ContactPhoneDialog.tsx`

### Risks

- Parent retains IntersectionObserver; `StatCounter` receives only `active: boolean`.
- `Footer.tsx` must never import `useCountUp` (server component).

### Validation

1. Stat cards count up on scroll on both `/` and `/about`.
2. WhatsApp links open the correct `wa.me/` URL in all 4 locations.
3. `npm run build` passes with no hook violation errors.

### Rollback

Per-file independent. New hook and icon files have no callers if call sites are reverted.

### Definition of done

Zero `useCountUp` implementations in component files. Zero hook calls inside `.map()`. `<WhatsAppIcon />` renders in all 4 former SVG locations.

### Automatable

WhatsApp SVG extraction is mechanical. The hooks fix requires manual reasoning about state flow.

---

## Batch 2 — Button Component with CVA Variants

**Scope:** M | **Dependencies:** Batch 0 | **Boundary changes:** none

### Goals

Replace 7+ copies of the primary CTA class string and all button/link variants with a single `<Button>` component using `class-variance-authority`.

### Primary CTA string being replaced (7+ occurrences)

```
px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider
```

### CVA variant table for `components/ui/button.tsx`

| `variant` | Key classes |
|---|---|
| `primary` (default) | `bg-amber-400 text-zinc-950 hover:bg-amber-300` |
| `ghost` | `border border-zinc-600 text-white hover:border-amber-400 hover:text-amber-400 font-medium` |
| `link` | `text-amber-400 hover:text-amber-300` |
| `admin-edit` | `text-zinc-400 hover:text-amber-400 disabled:opacity-40` |
| `destructive` | `text-zinc-400 hover:text-red-400 disabled:opacity-40` |
| `whatsapp` | `border border-green-600 text-green-600 hover:bg-green-700/10 gap-2` |
| `icon` | `rounded-full bg-green-600 hover:bg-green-500 text-white` |

| `size` | Key classes |
|---|---|
| `default` | `px-8 py-3 text-sm uppercase tracking-wider` |
| `lg` | `px-8 py-4 text-sm uppercase tracking-wider` |
| `sm` | `px-4 py-2 text-xs` |
| `xs` | `text-xs` |
| `full` | `w-full py-3 text-sm uppercase tracking-wider` |
| `icon` | `w-10 h-10` |

Component accepts `asChild` via `@radix-ui/react-slot` to render as `<a>`, `<Link>`, or `<button>`.

### Candidate files

- **New:** `components/ui/button.tsx`
- `app/[locale]/(home)/_components/AboutPreview.tsx`
- `app/[locale]/(home)/_components/MusicPreview.tsx`
- `app/[locale]/(home)/_components/ServicesPreview.tsx`
- `app/[locale]/(home)/_components/TrainersPreview.tsx`
- `app/[locale]/(home)/_components/ContactPreview.tsx`
- `app/[locale]/(home)/_components/Hero.tsx`
- `app/[locale]/_components/Navbar.tsx`
- `app/[locale]/(public)/about/_components/About.tsx`
- `app/[locale]/(public)/contact/_components/ContactForm.tsx`
- `app/[locale]/(admin)/admin/login/_components/LoginForm.tsx`
- `app/[locale]/(admin)/admin/_components/ServicesPanel.tsx`
- `app/[locale]/(admin)/admin/_components/SiteInfoForm.tsx`

**`Footer.tsx` must not be touched** — server component with no buttons.

### Risks

- Admin add/cancel toggle `<button>` elements must retain `type="button"` to prevent form submission.
- `asChild` + Next.js `<Link>` requires `@radix-ui/react-slot` (installed in Batch 0).
- Admin panel conditional pending-state classes — compose with `cn()`.

### Validation

1. All primary CTAs render amber fill with zinc-950 text.
2. Ghost button in `Hero.tsx` renders the correct outline/hover style.
3. Admin cancel buttons do not submit forms.
4. Disabled states show correct opacity and cursor.

### Rollback

Per-file independent. `Button` has no callers if import lines are reverted.

### Definition of done

Zero occurrences of `bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300` as an inline class string (verify by grep). `npm run build` passes.

### Automatable

Finding occurrences is automatable. Choosing the right `variant`+`size` per call site and `asChild` vs direct render require manual judgment.

---

## Batch 3 — Input Unification + Playlists Color Fix

**Scope:** S | **Dependencies:** Batch 0 | **Boundary changes:** none

### Goals

1. Unify three divergent input class strings into a single `<Input>` component.
2. Fix `text-black` → `text-zinc-950` in `Playlists.tsx` (the only `text-black` in the codebase).

### Three input variants currently in use

| Source | Differences |
|---|---|
| `styles.ts` `inputCls` — 4 admin panels | `px-3 py-2`, `bg-zinc-800` |
| `LoginForm.tsx` + `ContactForm.tsx` inline | `px-4 py-3`, `placeholder-zinc-500` |
| `SiteInfoForm.tsx` internal `Field` | `bg-zinc-900`, `py-2.5` |

Run `npx shadcn@latest add input`. Override defaults for the dark theme. Use a `size` variant (`compact`/`default`) for the padding difference; pass `className` override for the `SiteInfoForm` background difference. Delete `styles.ts` after all callers migrate.

A separate `<Textarea>` component (or shadcn textarea) is needed for the `<textarea>` elements in `ContactForm.tsx` and the admin panel forms — shadcn `Input` covers `<input>` only.

### Candidate files

- **New:** `components/ui/input.tsx` (shadcn generated)
- `app/[locale]/(admin)/admin/_components/styles.ts` — **delete**
- `app/[locale]/(admin)/admin/_components/ServicesPanel.tsx`
- `app/[locale]/(admin)/admin/_components/TrainersPanel.tsx`
- `app/[locale]/(admin)/admin/_components/PlaylistsPanel.tsx`
- `app/[locale]/(admin)/admin/_components/GalleryPanel.tsx`
- `app/[locale]/(admin)/admin/_components/SiteInfoForm.tsx`
- `app/[locale]/(admin)/admin/login/_components/LoginForm.tsx`
- `app/[locale]/(public)/contact/_components/ContactForm.tsx`
- `app/[locale]/(public)/music/_components/Playlists.tsx` (one-line color fix)

### Risks

- `SiteInfoForm.tsx`'s internal `Field` component forwards arbitrary `type` and `step` props — the new Input must forward all native input attributes via rest props.

### Validation

1. All inputs render correct background and padding per page.
2. Placeholder text is zinc-500 coloring.
3. Focus border is amber-400, no default ring.
4. Playlists active tab button computed color is `#09090b`, not `#000000`.
5. `npm run build` passes.

### Rollback

Restore `styles.ts`, revert class strings in all 9 files.

### Definition of done

Zero occurrences of `focus:border-amber-400` as an inline class string outside the shared Input component. `styles.ts` deleted. Zero occurrences of `text-black` in the codebase.

### Automatable

`inputCls` reference replacement is automatable. Classifying the three divergent variants and textarea handling require manual review.

---

## Batch 4 — StatCard Extraction

**Scope:** S | **Dependencies:** Batch 1 | **Boundary changes:** none

### Goals

Extract the verbatim stat card JSX block from `AboutPreview.tsx` and `About.tsx` into a shared `components/ui/stat-card.tsx`. Consumes `useCountUp` from Batch 1.

### Extracted pattern

```tsx
<div className="bg-zinc-800 rounded-2xl p-8 text-center border border-zinc-700 hover:border-amber-400/50 transition-colors">
  <div className="text-4xl font-black text-amber-400">{counted}{suffix}</div>
  <div className="mt-2 text-zinc-400 text-sm font-medium">{label}</div>
</div>
```

Props: `target: number`, `suffix?: string`, `label: string`, `active: boolean`.

`StatCard` must declare `'use client'` (calls `useCountUp` → `useEffect`/`useState`). Both call sites are already client components — no boundary change.

### Candidate files

- **New:** `components/ui/stat-card.tsx`
- `app/[locale]/(home)/_components/AboutPreview.tsx`
- `app/[locale]/(public)/about/_components/About.tsx`

### Risks

- Parent retains IntersectionObserver; `StatCard` receives `active: boolean` only.
- Cards must not re-animate on re-render after becoming visible.

### Validation

1. Stats count up on scroll on both `/` and `/about`.
2. Visual appearance identical.
3. `npm run build` passes.

### Definition of done

Zero inline `bg-zinc-800 rounded-2xl p-8 text-center` stat card divs in component files.

### Automatable

Mechanical extraction. `active` prop wiring requires manual verification.

---

## Batch 5 — TrainerCard + getInitials Deduplication

**Scope:** S | **Dependencies:** Batch 0 | **Boundary changes:** none

### Goals

Extract the verbatim trainer card JSX block and `getInitials()` function — both copy-pasted between `TrainersPreview.tsx` and `Trainers.tsx`.

### Extracted pattern

```tsx
<div className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 hover:border-amber-400/40 transition-all duration-300 text-center group w-72">
  {/* photo circle or initials fallback */}
  <h3 className="text-white font-bold text-xl">{trainer.name}</h3>
  <a className="inline-flex items-center gap-1.5 mt-3 text-zinc-400 hover:text-amber-400 transition-colors text-sm">
    @{trainer.ig_handle}
  </a>
</div>
```

Place `getInitials` in `lib/utils.ts` alongside `cn()`.

### Candidate files

- **New:** `components/ui/trainer-card.tsx`
- `lib/utils.ts` — add `getInitials`
- `app/[locale]/(home)/_components/TrainersPreview.tsx`
- `app/[locale]/(public)/trainers/_components/Trainers.tsx`

### Risks

- `group-hover:scale-120` — Tailwind v4 may not generate this class. If absent, add `--scale-120: 1.2` to the `@theme inline` block in `globals.css`.

### Validation

1. Trainer cards on `/trainers` and home page render identically.
2. Initials fallback renders when `photo_url` is absent.
3. Instagram links work.
4. `npm run build` passes.

### Definition of done

Single `getInitials` definition in the codebase. Single `TrainerCard` component.

### Automatable

Fully mechanical extraction. `scale-120` Tailwind v4 compatibility check is manual.

---

## Batch 6 — ContactInfoCard Shared Component

**Scope:** S | **Dependencies:** Batch 0 | **Boundary changes:** none

### Goals

Extract the contact row pattern repeated 4× inline in `Contact.tsx`, and the icon box pattern also used in `ContactPhoneDialog.tsx`.

### Extracted patterns

```
Row wrapper:  "flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
Icon box:     "w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0"
```

Component props: `icon: ReactNode`, `label?: string`, `value: string | ReactNode`, `href?: string`, `onClick?: () => void`, `iconClassName?: string`.

The `iconClassName` prop accommodates the Instagram card's gradient icon box (`bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400`) — a deviation from the default `bg-zinc-700`.

### Candidate files

- **New:** `components/ui/contact-info-card.tsx`
- `app/[locale]/(public)/contact/_components/Contact.tsx`
- `app/[locale]/(public)/contact/_components/ContactPhoneDialog.tsx` (icon box + front-side button only)

### Risks

- `ContactPhoneDialog` front-side is a `<button>` (triggers the flip) — the component must support `onClick` rendering, not just anchor.
- Do **not** abstract the back-side action buttons (call/WhatsApp/close) into this component.

### Validation

1. Contact page renders all four cards visually identically.
2. Hover states (border amber, `-translate-y-0.5`) animate correctly.
3. ContactPhoneDialog front card still flips on click.
4. `npm run build` passes.

### Definition of done

Zero inline `flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6` strings in Contact-related files.

### Automatable

Mechanical extraction. `iconClassName` prop for Instagram gradient requires manual handling.

---

## Batch 7 — ContactPhoneDialog: Scoped CSS Module

**Scope:** M | **Dependencies:** Batch 0, Batch 6 | **Boundary changes:** none

### Goals

Remove the global unscoped `<style>` tag injected directly into `ContactPhoneDialog.tsx`. The keyframe animations and class names `.flip-card-front`, `.flip-card-back`, `.action-btn` are global and can collide with any future code using those names.

### The problem

```tsx
<style>{`
  @keyframes flipIn { ... }
  .flip-card-front { animation: flipIn ... }
  .action-btn { animation: buttonScaleIn ... }
  .action-btn:nth-child(1) { animation-delay: 0.1s; }
`}</style>
```

### Fix

Create `ContactPhoneDialog.module.css` co-located with the component. Move all keyframes and class selectors there. Import and use `styles.flipCardFront`, `styles.flipCardBack`, `styles.actionBtn`. The `:nth-child` delay selectors work in CSS Modules.

**Preserve the interaction exactly.** The `isFlipped === false` conditional (distinct from `null`) that drives the flip-back class must remain. Do not replace with shadcn Dialog — that is a product UX decision, not a cleanup.

### Candidate files

- `app/[locale]/(public)/contact/_components/ContactPhoneDialog.tsx`
- **New:** `app/[locale]/(public)/contact/_components/ContactPhoneDialog.module.css`

### Validation

1. Card flips forward on click.
2. All 3 action buttons appear with staggered scale-in animation.
3. Any action button flips card back.
4. Navigating away and back resets the card.
5. DevTools `<head>` shows no injected `<style>` tag from this component.

### Rollback

Restore original `<style>` tag. Delete `.module.css`.

### Definition of done

Zero `<style>` JSX tags in the codebase (grep: `<style>{\``). `npm run build` passes.

### Automatable

Keyframe extraction is mechanical. `isFlipped` conditional class application requires manual verification.

---

## Batch 8 — Admin Panel Shared Primitives

**Scope:** L | **Dependencies:** Batch 0, Batch 2, Batch 3 | **Boundary changes:** none

### Goals

Reduce structural duplication across the 4 CRUD admin panels.

### Patterns to extract

| Component | Pattern | Used in |
|---|---|---|
| `components/admin/panel-header.tsx` | Section title + Add toggle button row | All 4 panels |
| `components/admin/item-row.tsx` | `bg-zinc-900 border border-zinc-800 rounded-xl p-4` wrapper with `isPending` opacity | ServicesPanel, TrainersPanel, PlaylistsPanel |
| `components/admin/feedback-flash.tsx` | `{feedback && <p className="text-amber-400 text-sm mb-3">}` | All 4 panels |

Do **not** abstract individual form fields inside each panel — field counts and validation logic differ per panel; the abstraction cost exceeds the duplication cost.

### Candidate files

- **New:** `components/admin/panel-header.tsx`
- **New:** `components/admin/item-row.tsx`
- **New:** `components/admin/feedback-flash.tsx`
- `app/[locale]/(admin)/admin/_components/ServicesPanel.tsx`
- `app/[locale]/(admin)/admin/_components/TrainersPanel.tsx`
- `app/[locale]/(admin)/admin/_components/PlaylistsPanel.tsx`
- `app/[locale]/(admin)/admin/_components/GalleryPanel.tsx`

### Risks

- `item-row` must accept `isPending: boolean` for the `opacity-50 pointer-events-none` conditional.
- `GalleryPanel` uses `flex-col overflow-hidden` on its item card — `item-row` should accept an optional `className` prop to cover this layout difference rather than a new variant.
- These primitives need no `'use client'` directive (no hooks) — they are pure display components consumed by the already-client panel components.

### Validation

1. All 4 panels add, edit, delete, and reorder items correctly.
2. Feedback flash appears after operations and clears after timeout.
3. Pending opacity/pointer-events work per operation.
4. `npm run build` passes.

### Definition of done

Zero inline `flex items-center justify-between mb-4 pb-2 border-b border-zinc-800` patterns across admin files.

### Automatable

Structural extraction is mechanical. The `isPending` prop interface across 4 panel variants requires manual review.

---

## Execution Sequencing

| PR | Batches | Rationale |
|---|---|---|
| PR 1 | 0 + 1 | Foundation + correctness bug — must ship together |
| PR 2 | 2 | Button CVA — high impact, warrants standalone review |
| PR 3 | 3 | Input unification + quick color fix |
| PR 4 | 4 + 5 + 6 | Independent extractions — can be parallelized across developers |
| PR 5 | 7 | CSS module scoping — isolated change, focused review |
| PR 6 | 8 | Admin panels — largest batch, last |

---

## Automation vs Manual Review Summary

| Batch | Automatable | Requires manual review |
|---|---|---|
| 0 | CLI init, package install | Color value correction after CLI |
| 1 | WhatsApp SVG extraction | Hooks-in-loop architectural fix |
| 2 | Grep all CTA class occurrences | `variant`+`size` per call site; `asChild` decisions |
| 3 | `inputCls` reference replacement | 3 divergent variants; textarea component choice |
| 4 | StatCard JSX extraction | `active` prop wiring |
| 5 | TrainerCard + getInitials extraction | `scale-120` Tailwind v4 compatibility |
| 6 | ContactInfoCard row extraction | `iconClassName` for Instagram gradient |
| 7 | Keyframe extraction to CSS module | `isFlipped` conditional class logic |
| 8 | Panel header/item-row extraction | `isPending` prop across 4 panel variants |

---

## Verification Checklist (apply per PR)

1. `npm run build` — no type errors.
2. `npm run lint:all` — no new ESLint errors.
3. `npm run dev` — visually verify affected pages.
4. Confirm `Footer.tsx` remains a server component (grep for client imports).
5. For any PR touching admin files: verify all 4 CRUD operations work (add, edit, delete, reorder).
