# Gentle Habit Tracker — Architecture Guidelines
> Source of truth for how this codebase is structured and how to expand it.

---

## The 3-Layer Model

Every UI element belongs to exactly one of three layers. No element skips a layer or occupies two.

```
Layer 1 — Page          pages/Today.tsx
Layer 2 — Body Host     components/today/HabitGrid/HabitGrid.tsx
Layer 3 — Actor         components/today/HabitGrid/HabitCard.tsx
```

### Layer 1 — Page
`pages/*.tsx`

The page orchestrates the full screen. It renders, in order:
1. **Header** (optional) — a named component, e.g. `<TodayHeader />`
2. **Body Host** — exactly one Layer 2 container that fills the remaining space
3. **Global Overlays** — dialogs, sheets, popovers (rendered via portal, outside the body flow)

The page never contains layout logic, style, or business logic. It is a pure composition of its three children.

```tsx
// ✅ Correct
export function Today() {
  return (
    <motion.div className="page today active" variants={PAGE_VARIANTS} ...>
      <TodayHeader />        {/* Layer 1 Header */}
      <HabitGrid />          {/* Layer 2 Body Host */}
    </motion.div>
  );
}

// ✅ Correct — with overlay
export const Journal = () => {
  return (
    <motion.div className="page journal active" variants={PAGE_VARIANTS} ...>
      <JournalScene />       {/* Layer 2 Body Host */}
      <JournalDialog />      {/* Global overlay — portal, not in body flow */}
    </motion.div>
  );
};
```

> **Rule:** If the page body contains more than one sibling component, they must be wrapped
> in a Layer 2 Body Host. The Page never renders two body-level components side by side.

---

### Layer 2 — Body Host
`components/{feature}/{FeatureName}.tsx`

The Body Host is the container for everything inside the page body. It:
- Defines how its children are **arranged** (flex column, grid, gap)
- Orchestrates **animation stagger** across children
- Renders one or more Layer 3 Actors

It does **not** decide where it sits on the page (that is `system.css`).
It does **not** have visual identity (color, border, shadow — that belongs to the Actor).

```tsx
// ✅ Correct — HabitGrid lays out its actors, nothing more
export function HabitGrid() {
  return (
    <motion.div className="habits-grid" variants={GRID_VARIANTS} ...>
      {habits.map((habit, idx) => <HabitCard key={habit.id} habit={habit} index={idx} />)}
      {habits.length === 0 && <TodayEmptyState />}
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

### Layer 3 — Actor
`components/{feature}/{ComponentName}.tsx`

The Actor is a self-contained visual unit. It:
- Defines its own **visual identity** (colors, typography, borders, shadows)
- Handles its own **interaction** (click, toggle, animation on self)
- Does **not** know about its siblings or its position on screen
- Does **not** set `position: absolute/fixed`, `margin`, or `z-index` on its own root element

```tsx
// ✅ Correct — HabitCard owns its look, not its place
export const HabitCard = ({ habit, index }) => (
  <motion.div className={cn('hcard', isDone && 'checked')} ...>
    <StyleComponent habit={habit} handleToggle={handleToggle} />
  </motion.div>
);
```

---

## Header Rule

Headers are **Layer 1 concerns**. They are rendered directly by the Page, not by the Body Host. This keeps the body container clean and makes it easy to add, remove, or restyle the header independently.

```
Page renders:  <PageHeader />  +  <BodyHost />
BodyHost never renders a header.
```

---

## CSS Responsibility Map

Three CSS layers, each with a single job.

| What | CSS file | Controls |
|---|---|---|
| Page placement | `src/styles/system.css` | Where the body host sits: `padding-top`, safe-area offsets, fixed element positions |
| Body Host layout | Co-located with the host component | How children are arranged inside: `display`, `flex-direction`, `gap`, `grid-template-columns` |
| Actor appearance | Co-located with the actor component | What the component looks like: color, border, radius, shadow, typography |

### The Hard Rules

```
system.css   → position, inset, z-index, margin (page-level only)
host .css    → display, gap, grid, flex, internal padding
actor .css   → background, color, border, border-radius, font-size, box-shadow
```

An Actor CSS file never contains `position: fixed/absolute` on its own root.
A Body Host CSS file never contains `background`, `border`, or `color`.
`system.css` never contains component-level visual properties.

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
│   │   └── HabitGrid/        ← Layer 2 Body Host folder
│   │       ├── HabitGrid.tsx
│   │       ├── HabitCard.tsx
│   │       ├── HabitStyles.tsx
│   │       ├── BloomEffect.tsx
│   │       ├── TodayEmptyState.tsx
│   │       ├── habit-cards.css
│   │       └── index.ts
│   │
│   ├── journal/
│   │   ├── JournalDialog.tsx ← Layer 1 Global Overlay (not in body host)
│   │   └── JournalScene/     ← Layer 2 Body Host folder
│   │       ├── JournalScene.tsx
│   │       ├── NeuralWeb.tsx         ← Actor: flex:1, fills space above dock
│   │       ├── momentum/             ← Sub-feature folder inside the body host
│   │       │   ├── MomentumDock.tsx  ← Actor that orchestrates its own sub-views
│   │       │   ├── MomentumWeekly.tsx
│   │       │   ├── MomentumMonthly.tsx
│   │       │   ├── MomentumStats.tsx
│   │       │   └── momentum.css
│   │       ├── journal-scene.css
│   │       └── index.ts
│   │
│   └── settings/
│       └── SettingsGrid/     ← Layer 2 Body Host folder
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

### Body Hosts (Layer 2)
Named after **what they contain** and **how they arrange it**.

| Suffix | Meaning | Example |
|---|---|---|
| `Grid` | Card grid or bento layout | `HabitGrid`, `SettingsGrid` |
| `Scene` | Full-bleed canvas or ambient visual area | `JournalScene` |
| `Dock` | Anchored panel with internal tab navigation | `MomentumDock` |
| `List` | Scrollable item list | `NotificationList` *(future)* |
| `Feed` | Chronological stream | `ActivityFeed` *(future)* |

### Actors (Layer 3)
Named after **what they represent**.

| Suffix | Meaning | Example |
|---|---|---|
| `Card` | Standalone item in a grid | `HabitCard` |
| `Header` | Page-level title block | `TodayHeader` |
| `Section` | Named settings group | `ProfileSection` |
| `EmptyState` | Zero-state placeholder | `TodayEmptyState` |
| `Weekly/Monthly/Stats` | Named sub-views of a dock | `MomentumWeekly` |

### Global Overlays (Page-level, Layer 1)
Named after **the feature they serve** + `Dialog` or `Sheet`.

| Pattern | Example |
|---|---|
| `{Feature}Dialog` | `JournalDialog` |

---

## The Journal Layout (Worked Example)

The Journal is the most complex page. This is the canonical reference.

```
pages/Journal.tsx
  <motion.div class="page journal active">     ← system.css: padding-top safe area
    <JournalScene />                           ← Layer 2 Body Host
    <JournalDialog />                          ← Portal overlay, outside body flow
  </motion.div>
```

```
JournalScene.tsx
  <div class="journal-scene">                  ← display:flex; flex:1; flex-direction:column
    <NeuralWeb />                              ← Actor: flex:1 — fills remaining space
    <MomentumDock />                           ← Actor: position:fixed (system.css placement)
  </div>
```

```css
/* system.css — WHERE the journal body sits on screen */
.page.journal {
  padding-top: calc(var(--safe-t) + var(--s-32));
}

/* journal-scene.css — HOW JournalScene arranges its children */
.journal-scene {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;   /* critical: allows children to shrink correctly in flex */
  position: relative;
  width: 100%;
}

/* NeuralWeb actor — fills all space above the fixed dock */
#neural-web {
  flex: 1;
  min-height: 0;
  touch-action: none;
  display: block;
}

/* system.css — MomentumDock is fixed, placed above nav by system */
#momentum-dock {
  position: fixed;
  bottom: calc(var(--nav-height) + var(--safe-b));
  left: 0; right: 0;
  /* ... */
}
```

NeuralWeb naturally fills whatever space the page gives it. MomentumDock floats fixed above the nav. The header safe-area is absorbed by `.page.journal` — nothing inside needs to know about it.

---

## Motion Variant Rules

| Variant | Use for |
|---|---|
| `PAGE_VARIANTS` | The `motion.div` wrapper in `pages/*.tsx` **only** |
| `PANEL_VARIANTS` | Internal panels, tab views, sub-views within a dock |
| `GRID_VARIANTS` | The Body Host stagger wrapper |
| `GRID_ITEM_VARIANTS` | Individual Actors inside a stagger grid |
| `DIALOG_VARIANTS` | `Dialog.tsx` overlay and bottom sheet |
| `BLOOM_VARIANTS` | `BloomEffect.tsx` only |
| `MOMENTUM_TRANSITIONS` | Momentum chart bars, dots, labels |

> `PAGE_VARIANTS` must never be used on anything other than a page root `motion.div`.

---

## Expansion Checklists

### Adding a New Page

- [ ] Create `pages/{PageName}.tsx` — wrap in `<motion.div class="page {name} active" variants={PAGE_VARIANTS}>`
- [ ] Add to `App.tsx` `AnimatePresence` block
- [ ] Add nav button to `Navigation.tsx`
- [ ] Add page name to `AppState.currentPage` union in `useAppStore.ts`
- [ ] Add a numbered page section to `system.css`
- [ ] Create `components/{feature}/` folder for the body host

### Adding a New Body Host

- [ ] Create `components/{feature}/{FeatureName}.tsx`
- [ ] Create `components/{feature}/{feature-name}.css` — layout only (`display`, `gap`, `grid`)
- [ ] Add `@import` to `index.css` under `FEATURE-SPECIFIC`
- [ ] Add placement rules to `system.css` (`padding-top`, `position` if fixed)
- [ ] Export via `index.ts`

### Adding a New Actor

- [ ] Create `components/{feature}/{ActorName}.tsx`
- [ ] Add actor styles to the feature's co-located `.css` file
- [ ] Add geometry (border-radius) to `geometry.css` under the correct page section
- [ ] Never set `position`, `margin`, or `z-index` on the actor's root element

### Adding a New Habit Card Style (s11+)

- [ ] Add `Style{Name}` component in `HabitStyles.tsx` using the shared `<WeekRow>` actor
- [ ] Register in `STYLE_MAP` at the bottom of `HabitStyles.tsx`
- [ ] Add geometry rule to `geometry.css` → `2. TODAY PAGE`: `.hcard.s11 .visual { border-radius: ... }`
- [ ] Update style count in `AppearanceSection.tsx`

---

## The One Firm Law

> **The Body Host decides layout. The Actor decides appearance. The Page decides placement. Nothing decides two things.**

If you find yourself writing `position: fixed` inside an Actor — stop.
If you find yourself writing `background-color` inside a Body Host — stop.
If you find yourself writing `gap` inside `system.css` — stop.

The responsibility belongs elsewhere.
