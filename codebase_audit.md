# Codebase Architecture Audit
**Gentle Habit Tracker** · April 2026

---

## 1. Architecture Model (Actor / Orchestrator)

The intended pattern is:
- **Orchestrator** — a host/container that owns layout, animation sequencing, and composition. It knows nothing about business logic.
- **Actor** — a focused mini-component that renders its own visual identity. It knows nothing about its siblings' positions.

> [!IMPORTANT]
> The pattern is **mostly respected** but has 5 concrete violations and 3 structural weaknesses that will create friction as the codebase expands.

---

## 2. Full Component Map

```
App.tsx  (Root Shell — ✅ correct)
├── Navigation  (Shared Actor + own CSS — ✅ correct)
├── pages/Today.tsx  (Orchestrator — ✅ correct)
│   ├── TodayHeader  (Actor — ⚠️ CSS imported inside component, not via index.css)
│   └── HabitGrid/  (Host Orchestrator — ✅ correct)
│       ├── HabitCard  (Actor — ✅ correct)
│       │   └── HabitStyles.tsx  (10 style variants — ⚠️ 550-line monolith, no host)
│       ├── BloomEffect  (Actor — ⚠️ hardcodes structural style in inline JSX)
│       └── TodayEmptyState  (Actor — ✅ correct)
│
├── pages/Journal.tsx  (Orchestrator — ⚠️ imports JournalDialog directly, bypasses JournalScene)
│   ├── JournalScene/  (Host — ⚠️ not a proper Orchestrator, no CSS, missing index export for dialog)
│   │   └── NeuralWeb  (Actor — ✅ correct but empty/stub)
│   └── momentum/
│       ├── MomentumDock  (Host Orchestrator — ✅ correct)
│       │   ├── MomentumWeekly  (Actor — ✅ correct)
│       │   ├── MomentumMonthly  (Actor — ✅ correct)
│       │   └── MomentumStats  (Actor — ✅ correct)
│       └── JournalDialog  (Actor — ❌ lives in momentum/ but belongs to journal/ level)
│
└── pages/Settings.tsx  (Orchestrator — ✅ correct)
    └── SettingsGrid/  (Host Orchestrator — ✅ correct)
        ├── ProfileSection  (Actor — ✅ correct)
        ├── AppearanceSection  (Actor — ✅ correct)
        └── HabitSection  (Actor — ✅ correct)
```

---

## 3. Violations & Findings

### ❌ VIOLATION 1 — `JournalDialog` is in the wrong directory
**File:** `src/components/journal/momentum/JournalDialog.tsx`

`JournalDialog` is placed inside the `momentum/` folder but it is not a Momentum sub-component — it is a page-level concern of the Journal feature. It is imported directly by `pages/Journal.tsx`, bypassing the `JournalScene` orchestrator entirely.

**Effect:** The Journal page has two disconnected rendering roots (`JournalScene` + `JournalDialog`) with no host tying them together.

**Fix:** Move `JournalDialog.tsx` to `journal/JournalScene/` and have `JournalScene` render it. Or create a `journal/` host index.

---

### ❌ VIOLATION 2 — `BloomEffect` has hardcoded structural layout in inline styles
**File:** `src/components/today/HabitGrid/BloomEffect.tsx` (lines 19–29)

```tsx
style={{ 
  position: 'absolute',
  left: '50%', top: '50%',
  marginLeft: -(size/2), marginTop: -(size/2),
  ...
}}
```

An **Actor** must not own its own structural placement. The `position: absolute` + offset centering is layout that belongs to the Host (`HabitCard`). The Actor should receive a class and let CSS handle geometry.

**Fix:** Remove the inline style object. Add `.bloom-effect` positioning to `habit-cards.css`. The `size` and `color` props can remain as CSS custom properties passed via `style={{ '--bloom-size': size }}`.

---

### ❌ VIOLATION 3 — `TodayHeader` self-imports its CSS (breaks co-location convention)
**File:** `src/components/today/TodayHeader.tsx` (line 3)

```tsx
import './today-header.css';
```

Every other component in the project has its CSS imported via `index.css` (the global entry point). `TodayHeader` is the only component that self-imports. This is an inconsistency — a reader following the CSS import chain in `index.css` will not find `today-header.css` listed there.

**Fix:** Remove the self-import from `TodayHeader.tsx` and add `@import "./components/today/today-header.css";` to `index.css` alongside the other feature imports.

---

### ❌ VIOLATION 4 — `HabitStyles.tsx` is a 550-line monolith with no host
**File:** `src/components/today/HabitGrid/HabitStyles.tsx`

This file exports 10 separate React components (`StyleClassic`, `StyleStrike`, … `StylePeel`) in a single flat file. Each style is its own **Actor** but they share no host — they are just exported and registered in a `STYLE_MAP`. Problems:
1. Each of the 10 styles duplicates the **identical** week-row rendering block (≈30 lines × 10 = 300 lines of copy-paste).
2. There is no `WeekRow` actor — the repeated week iteration is inlined in every style.
3. The file will grow unboundedly as new styles are added.

**Fix:** Extract a shared `WeekRow` actor component (it already has a stable interface). Each style then renders `<HabitHeader>` + `<WeekRow>`, making each style component ~15 lines.

---

### ⚠️ WEAKNESS 1 — `MomentumDock` uses `PAGE_VARIANTS` instead of a panel variant
**File:** `src/components/journal/momentum/MomentumDock.tsx` (line 43)

```tsx
variants={PAGE_VARIANTS}
initial="initial"
animate="enter"
exit="exit"
```

`PAGE_VARIANTS` is documented as *"Shared across Today, Journal, and Settings"* — it is a page-level transition, not a panel-level one. `MomentumDock` is a panel/widget, not a page. Using `PAGE_VARIANTS` here creates a semantic mismatch; if `PAGE_VARIANTS` changes (e.g. adding a slide direction), `MomentumDock` will be unintentionally affected.

**Fix:** Use `PANEL_VARIANTS` (which already exists in `motion.ts`) or create a dedicated `DOCK_VARIANTS`.

---

### ⚠️ WEAKNESS 2 — Duplicate motion variants (`LIST_VARIANTS` / `ITEM_VARIANTS` are unused)
**File:** `src/lib/motion.ts` (lines 85–108)

`LIST_VARIANTS` and `ITEM_VARIANTS` are defined but never imported anywhere in the codebase. `GRID_VARIANTS` and `GRID_ITEM_VARIANTS` serve the same role. This creates confusion: a future developer won't know which to use.

**Fix:** Either delete `LIST_VARIANTS`/`ITEM_VARIANTS` or document them as "reserved for future list views." Also, `HEADER_VARIANTS` is defined but not used anywhere.

---

### ⚠️ WEAKNESS 3 — `useAppStore` leaks internal actions into public API
**File:** `src/store/useAppStore.ts` (lines 47–49)

```ts
_toggleHabit: (id: number, key?: string) => void;
_addHabit: (name: string) => void;
_removeHabit: (id: number) => void;
```

The underscore-prefixed internal actions are on the public `AppState` interface, meaning any component can call them directly, bypassing the `useHabits` hook's late-logging protection guard. For example, `_toggleHabit` in the store does **not** enforce the today/yesterday restriction — only `useHabits.handleToggle` does.

**Fix:** Consider making the internal actions unexposed (use a closure or Zustand's `getState`) or at minimum add a JSDoc `@internal` warning.

---

### ⚠️ WEAKNESS 4 — `setSettings` in store duplicates side effect from `App.tsx`
**File:** `src/store/useAppStore.ts` (line 68) + `src/App.tsx` (lines 15–17)

The store's `setSettings` calls `document.documentElement.setAttribute('data-theme', ...)` directly. `App.tsx` also has a `useEffect` that sets the same attribute when `settings.theme` changes. This is a **duplicate side effect** — the attribute gets set twice on every theme change.

**Fix:** Remove the DOM mutation from the store action and keep it exclusively in `App.tsx`'s `useEffect`.

---

### ⚠️ WEAKNESS 5 — `globals.css` has dual `padding-bottom` for nav offset
**File:** `src/styles/globals.css` (line 66) + `src/styles/system.css` (line 20)

`#body` in `globals.css` has `padding-bottom: 108px` and `.page` in `system.css` also has `padding-bottom: calc(108px + var(--safe-b))`. Both are compensating for the navigation bar height. If the nav height changes, it must be updated in **two places**.

**Fix:** Define `--nav-height: 108px` as a token in `foundations.css` and reference it in both places.

---

### ⚠️ WEAKNESS 6 — `geometry.css` references `.habit-card.s*` but components use `.hcard.s*`
**File:** `src/styles/geometry.css` (lines 43–69)

```css
.habit-card.s1 .visual,  /* ← does not match */
```

The actual rendered class is `.hcard` (set in `HabitCard.tsx` line 31: `` `hcard s${settings.style}` ``). The geometry selectors using `.habit-card` are dead CSS that applies to nothing.

**Fix:** Update geometry selectors to `.hcard.s*` to match the actual rendered DOM.

---

### ℹ️ INFO — `ErrorBoundary` is defined but never used
**File:** `src/components/shared/ErrorBoundary.tsx`

The component is fully implemented but never imported or used anywhere (not in `App.tsx`, not in any page). This is a missed safety net.

**Fix:** Wrap `<AppContent />` (or each page) in `<ErrorBoundary>` in `App.tsx`.

---

### ℹ️ INFO — `NeuralWeb` canvas is a stub with commented-out logic
**File:** `src/components/journal/JournalScene/NeuralWeb.tsx`

The canvas element is mounted but does nothing — all drawing logic is commented out with a placeholder comment. The `#neural-web` element in `system.css` has `height: 60vh` allocated for it.

**Fix:** Either implement the animation or remove the canvas element and reclaim the 60vh space for `MomentumDock`.

---

### ℹ️ INFO — `index.css` imports Tailwind but the codebase uses `clsx + twMerge`
**File:** `src/index.css` (line 18) + `src/lib/utils.ts` (lines 3–6)

Tailwind is imported globally (`@import "tailwindcss"`) but the `cn()` utility uses `tailwind-merge`. This means Tailwind's utility classes are available, creating an escape hatch from the design system. In `HabitStyles.tsx` line 262, `"wd-dot relative"` directly uses a Tailwind utility class (`relative`).

**Fix:** Decide: either fully use Tailwind (and remove the custom CSS layers) or remove it and replace `wd-dot relative` with a proper CSS class. Mixing both is a technical debt trap.

---

## 4. Expansion Readiness Score

| Concern | Status |
|---|---|
| Adding a new **page** | ✅ Easy — add to `App.tsx` + `pages/` + `system.css` section |
| Adding a new **Settings card** | ✅ Easy — add a new `*Section.tsx` in `SettingsGrid/` |
| Adding a new **Momentum tab** | ✅ Easy — add to `TabType`, render in `MomentumDock` |
| Adding a new **habit card style** (s11+) | ⚠️ Painful — requires 30+ lines in `HabitStyles.tsx` |
| Adding a **new dialog type** | ✅ Easy — compose `Dialog` with new content |
| Changing the **nav height** | ⚠️ Must update 2 files manually |
| Changing the **page transition** | ⚠️ Affects `MomentumDock` unintentionally (WEAKNESS 1) |
| Adding a **new theme** | ✅ Easy — add to `THEMES`, `THEME_COLORS`, `globals.css` |

---

## 5. Priority Fix List

| Priority | File | Fix |
|---|---|---|
| 🔴 High | `geometry.css:43-69` | Fix dead `.habit-card.s*` → `.hcard.s*` selectors |
| 🔴 High | `useAppStore.ts:68` + `App.tsx:15` | Remove duplicate `setAttribute` side effect |
| 🟠 Medium | `JournalDialog.tsx` | Move from `momentum/` → `journal/JournalScene/` |
| 🟠 Medium | `BloomEffect.tsx` | Remove inline layout styles; move to CSS |
| 🟠 Medium | `TodayHeader.tsx:3` | Remove self-import; add to `index.css` |
| 🟠 Medium | `HabitStyles.tsx` | Extract `WeekRow` actor to kill 300 lines of duplication |
| 🟡 Low | `MomentumDock.tsx:43` | Switch `PAGE_VARIANTS` → `PANEL_VARIANTS` |
| 🟡 Low | `motion.ts:85-108` | Delete or document unused `LIST_VARIANTS`/`ITEM_VARIANTS`/`HEADER_VARIANTS` |
| 🟡 Low | `globals.css:66` | Replace `108px` with `var(--nav-height)` token |
| 🟡 Low | `App.tsx` | Wrap content in `<ErrorBoundary>` |
| 🟡 Low | `useAppStore.ts:47` | JSDoc `@internal` guard on `_toggleHabit` etc. |
