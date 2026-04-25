# Gentle Habit Tracker — Architecture Guidelines
> Source of truth for how this codebase is structured and how to expand it.

---

## The 3-Layer Model

Every UI element belongs to exactly one of three layers. This hierarchy ensures strict separation of layout, logic, and visual identity.

```
Layer 1 — Page          pages/Today.tsx
Layer 2 — Component     components/today/HabitGrid/HabitGrid.tsx
Layer 3 — Segment       components/today/HabitGrid/HabitCard.tsx
```

### Layer 1 — Page
`pages/*.tsx`

The page orchestrates the entire screen. It manages Layer 2 components and ensures they are rendered in the correct order:
1. **Header** (optional) — e.g. `<TodayHeader />`
2. **Body Components** — one or more Layer 2 components that form the page content.
3. **Global Overlays** — dialogs, sheets, or popovers.

The page handles composition and state orchestration between its components. It does not contain direct visual styling or business logic.

```tsx
// ✅ Correct
export function Today() {
  return (
    <motion.div className="page today active" variants={PAGE_VARIANTS} ...>
      <TodayHeader />        {/* Layer 1 Header */}
      <HabitGrid />          {/* Layer 2 Body Component */}
    </motion.div>
  );
}

// ✅ Correct — with overlay
export const Journal = () => {
  return (
    <motion.div className="page journal active" variants={PAGE_VARIANTS} ...>
      <JournalScene />       {/* Layer 2 Body Component */}
      <JournalDialog />      {/* Layer 1 Overlay */}
    </motion.div>
  );
};
```

> **Rule:** The Page is the manager. It decides which Layer 2 components are visible and in what sequence. It uses `system.css` for overall placement.

---

### Layer 2 — Component
`components/{feature}/{FeatureName}.tsx`

The Component is a functional unit within the page body. It:
- Defines how its segments are **arranged** (grid, list, flex)
- Orchestrates **internal logic** and stagger animations
- Renders one or more Layer 3 Segments

It does **not** decide its absolute placement on the page.
It does **not** have its own visual identity (borders, shadows — those belong to Segments).

```tsx
// ✅ Correct — HabitGrid lays out its segments
export function HabitGrid() {
  return (
    <motion.div className="habits-grid" variants={GRID_VARIANTS} ...>
      {habits.map((h, i) => <HabitCard key={h.id} habit={h} index={i} />)}
    </motion.div>
  );
}
```

If a Body Host itself contains **named sub-views** (like tabs), it acts as an Orchestrator for those sub-views and hosts them directly — no extra wrapper needed.

```tsx
// ✅ Correct — MomentumDock hosts its own tab panel actors
export function MomentumDock() {
  const [activeTab, setActiveTab] = useState('weekly');
  return (
    <div id="momentum-dock">
      <MomentumHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <AnimatePresence mode="wait">
        {activeTab === 'weekly'  && <MomentumWeekly />}
        {activeTab === 'monthly' && <MomentumMonthly />}
        {activeTab === 'stats'   && <MomentumStats />}
      </AnimatePresence>
    </div>
  );
}
```

---

### Layer 3 — Segment
`components/{feature}/{ComponentName}.tsx`

The Segment is the atomic visual unit. It:
- Defines its own **visual identity** (colors, typography, borders, shadows)
- Handles its own **interaction** (click, toggle, self-animation)
- Does **not** know about its siblings or overall layout

```tsx
// ✅ Correct — HabitCard owns its look, not its arrangement
export const HabitCard = ({ habit, index }) => (
  <motion.div className={cn('hcard', isDone && 'checked')} ...>
    <StyleComponent habit={habit} />
  </motion.div>
);
```

---

## Header Rule

Headers are **Layer 1 concerns**. They are rendered directly by the Page, not by a Component. This keeps the body container clean and makes it easy to add, remove, or restyle the header independently.

```
Page renders:  <PageHeader />  +  <Component />
Component never renders a header.
```

---

## CSS Responsibility Map

Two CSS layers, each with a single job.

| What | CSS file | Controls |
|---|---|---|
| Page placement | `src/styles/system.css` | WHERE the components sit on the page: `padding-top`, safe-area offsets, and global placement. |
| Component visuals | Co-located `.css` | HOW the component and its segments look: layout, colors, borders, shadows, and typography. |

### The Hard Rules

```
system.css      → placement, inset, z-index, page-level padding/margin
component .css  → display, gap, grid, flex, background, color, border, radius
```

`system.css` never contains component-level visual properties (colors, borders).
A Component CSS file handles everything from the component's internal layout to the fine details of its segments.

---

## File & Folder Structure

```
src/
├── pages/
│   ├── Today.tsx             ← Layer 1
│   ├── Journal.tsx           ← Layer 1
│   └── Settings.tsx          ← Layer 1
│
├── components/
│   ├── shared/               ← App-wide atoms (Dialog, Navigation, ErrorBoundary)
│   │   ├── Dialog.tsx
│   │   ├── Navigation.tsx
│   │   ├── dialog.css
│   │   └── navigation.css
│   │
│   ├── today/
│   │   ├── TodayHeader.tsx   ← Layer 1 Header
│   │   ├── today-header.css
│   │   └── HabitGrid/        ← Layer 2 Component folder
│   │       ├── HabitGrid.tsx
│   │       ├── HabitCard.tsx
│   │       ├── HabitStyles.tsx
│   │       ├── BloomEffect.tsx
│   │       ├── TodayEmptyState.tsx
│   │       ├── habit-cards.css
│   │       └── index.ts
│   │
│   ├── journal/
│   │   ├── JournalDialog.tsx ← Layer 1 Global Overlay
│   │   ├── NeuralWeb/        ← Layer 2 Component
│   │   │   ├── NeuralWeb.tsx
│   │   │   └── neural-web.css
│   │   └── momentum/         ← Layer 2 Component
│   │       ├── MomentumDock.tsx
│   │       ├── MomentumWeekly.tsx
│   │       ├── MomentumMonthly.tsx
│   │       ├── MomentumStats.tsx
│   │       └── momentum.css
│   │
│   └── settings/
│       └── SettingsGrid/     ← Layer 2 Component folder
│           ├── SettingsGrid.tsx
│           ├── ProfileSection.tsx
│           ├── AppearanceSection.tsx
│           ├── HabitSection.tsx
│           ├── settings.css
│           └── index.ts
│
├── styles/
│   ├── foundations.css  ← Design tokens (spacing, color, radius, type, motion)
│   ├── globals.css      ← HTML reset + theme definitions
│   ├── system.css       ← Page-level structure (placement, safe areas, z-index)
│   └── geometry.css     ← Border-radius orchestration layer
│
├── hooks/               ← Business logic hooks (no JSX)
├── store/               ← Global state (Zustand)
└── lib/
    ├── motion.ts        ← Animation variants and spring presets
    └── utils.ts         ← Pure utility functions
```

---

## Naming Conventions

### Components (Layer 2)
Named after **what they contain** and **how they arrange it**.

| Suffix | Meaning | Example |
|---|---|---|
| `Grid` | Card grid or bento layout | `HabitGrid`, `SettingsGrid` |
| `Dock` | Anchored panel with internal navigation | `MomentumDock` |
| `Web` | Ambient visual canvas | `NeuralWeb` |
| `List` | Scrollable item list | `NotificationList` *(future)* |

### Segments (Layer 3)
Named after **what they represent**.

| Suffix | Meaning | Example |
|---|---|---|
| `Card` | Standalone item in a grid | `HabitCard` |
| `Section` | Named settings group | `ProfileSection`, `AtmosphereSection` |
| `EmptyState` | Zero-state placeholder | `TodayEmptyState` |
| `Effect` | Visual feedback element | `BloomEffect` |
| `Weekly/Monthly/Stats` | Named sub-views of a dock | `MomentumWeekly`, `MomentumMonthly` |

### Layer 1 Components
Orchestration elements managed directly by the Page.

| Category | Suffix | Meaning | Example |
|---|---|---|---|
| **Header** | `Header` | Page-level title and status block | `TodayHeader` |
| **Overlay** | `Dialog`, `Sheet` | Portal-rendered global UI | `JournalDialog` |

---

## The Journal Layout (Worked Example)

The Journal is the most complex page. This is the canonical reference.

```
pages/Journal.tsx
  <motion.div className="page journal active">  {/* .page provides flex column */}
    <NeuralWeb />                              {/* Layer 2 Component: flex:1 */}
    <MomentumDock />                           {/* Layer 2 Component: position:fixed */}
    <JournalDialog />                          {/* Layer 1 Global Overlay */}
  </motion.div>
```

```css
/* system.css — WHERE the journal elements sit on screen */
.page.journal {
  padding-top: calc(var(--safe-t) + var(--s-32));
}

#momentum-dock {
  position: fixed;
  bottom: calc(var(--nav-height) + var(--safe-b));
  left: 0; right: 0;
  z-index: 40;
}

/* neural-web.css — HOW the web component fills its space */
#neural-web {
  flex: 1;
  min-height: 0;
  display: block;
}
```

NeuralWeb naturally fills whatever space the page gives it via flexbox (Layer 2 behavior). MomentumDock is fixed to the bottom of the screen by the system (Layer 1 orchestration). The header safe-area is absorbed by the page padding.

---

## Motion Variant Rules

| Variant | Use for |
|---|---|
| `PAGE_VARIANTS` | The `motion.div` wrapper in `pages/*.tsx` **only** |
| `PANEL_VARIANTS` | Internal panels, tab views, sub-views within a dock |
| `GRID_VARIANTS` | The Component stagger wrapper |
| `GRID_ITEM_VARIANTS` | Individual Segments inside a stagger grid |
| `DIALOG_VARIANTS` | `Dialog.tsx` overlay and bottom sheet |
| `BLOOM_VARIANTS` | `BloomEffect.tsx` only |
| `MOMENTUM_TRANSITIONS` | Momentum chart bars, dots, labels |

> `PAGE_VARIANTS` must never be used on anything other than a page root `motion.div`.

---

## Expansion Checklists

### Adding a New Page

- [ ] Create `pages/{PageName}.tsx` — wrap in `<motion.div className="page {name} active" variants={PAGE_VARIANTS}>`
- [ ] Add to `App.tsx` `AnimatePresence` block
- [ ] Add nav button to `Navigation.tsx`
- [ ] Add page name to `AppState.currentPage` union in `useAppStore.ts`
- [ ] Add a numbered page section to `system.css`
- [ ] Create `components/{feature}/` folder for the components

### Adding a New Component

- [ ] Create `components/{feature}/{FeatureName}.tsx`
- [ ] Create `components/{feature}/{feature-name}.css` — visuals and layout (`display`, `gap`, `background`, `border`)
- [ ] Add `@import` to `index.css` under `FEATURE-SPECIFIC`
- [ ] Add placement rules to `system.css` (`padding-top`, `position` if fixed)
- [ ] Export via `index.ts`

### Adding a New Segment

- [ ] Create `components/{feature}/{SegmentName}.tsx`
- [ ] Add segment styles to the feature's co-located `.css` file
- [ ] Add geometry (border-radius) to `geometry.css` under the correct page section
- [ ] Never set `position`, `margin`, or `z-index` on the segment's root element

### Adding a New Habit Card Style (s11+)

- [ ] Add `Style{Name}` component in `HabitStyles.tsx` using the shared `<WeekRow>` segment
- [ ] Register in `STYLE_MAP` at the bottom of `HabitStyles.tsx`
- [ ] Add geometry rule to `geometry.css` → `2. TODAY PAGE`: `.hcard.s11 .visual { border-radius: ... }`
- [ ] Update style count in `AtmosphereSection.tsx`

---

## The One Firm Law

> **The Component decides its visual identity and internal layout. The Page decides where that component sits on the screen. Nothing decides both.**

If you find yourself writing `background-color` or `border` inside `system.css` — stop.
If you find yourself writing `position: fixed` or `inset` inside a Component — stop.
If you find yourself writing `gap` or `padding` for page-level spacing inside a Component — stop.

The responsibility belongs elsewhere.
