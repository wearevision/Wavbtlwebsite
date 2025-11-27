# WAV BTL — Design System & Engineering Guidelines (v2.0)

## 1. Core Philosophy: Cinematic Geometry
These principles govern the entire application. They are non-negotiable.

### 1.1 The "No-Smoke" Policy
*   **Visuals:** Functional, high-contrast, decisive. No decorative filler.
*   **Motion:** Physics-based ease. No bounce, no rubber-banding. Snap to grid.
*   **Code:** Semantic HTML, highly optimized rendering, strict typing.

### 1.2 Geometric Integrity
*   The trapezoid (~17° angle) is the core brand atom.
*   **Rule:** Never skew images. Mask them.
*   **Rule:** Parallel horizontal lines always remain parallel.

---

## 2. The Infinite Mosaic (PROTECTED SYSTEM)
> ⚠️ **WARNING:** This logic is stable and production-ready. DO NOT MODIFY layout logic, spacing, or angular math without explicit authorization.

### 2.1 Mosaic Behavior
*   **Structure:** Infinite wall of identical trapezoidal tiles.
*   **Movement:** Interactive parallax reacting to mouse (X/Y) and scroll.
*   **Overflow:** The grid must logically extend beyond the viewport to prevent "white edges" during rotation.

### 2.2 Tile Specification
*   **Mask:** 17° inward angle on vertical edges.
*   **Spacing:** Strict 2px–4px uniform gap.
*   **State - Resting:** Monochrome, high contrast.
*   **State - Hover:** Scale 110% (image only), Color Reveal, Z-index bump.

---

## 3. Expanded Card (Modal) — New Architecture
This is the primary reading environment. It must function as an editorial layout, not just a popup.

### 3.1 Layout Strategy: The "Split & Stack"
The layout adapts drastically per breakpoint to preserve the content's hierarchy.

*   **Desktop (>1024px):** Asymmetric Split.
    *   Left (Visuals): Sticky, Full Height, Trapezoidal Cut.
    *   Right (Content): Scrollable, Clean Typography.
*   **Tablet (768px - 1024px):** Hybrid Stack.
    *   Top (Visuals): 45vh height.
    *   Bottom (Content): Scrollable.
*   **Mobile (<768px):** Vertical Flow.
    *   Top (Visuals): Aspect Ratio 4:5 or 1:1. Diagonal bottom cut.
    *   Bottom (Content): Full width, standard scroll.

### 3.2 Content Constraints (Strict)
To maintain the "Cinematic" look, content **must** fit these constraints. The UI must handle overflow gracefully if these are exceeded, but the design intent is strict.

*   **H1 Title:**
    *   Max length: 60 characters.
    *   Scale: Fluid (Clamp).
    *   Line-height: 1.1 (Tight).
*   **Body Text:**
    *   Max length: 800 characters (approx 2 paragraphs).
    *   Line-height: 1.6 (Relaxed).
    *   Max-width: 65ch (Optimal reading measure).

### 3.3 Scroll Physics
*   **Global Body:** Locked (overflow-hidden) when Modal is open.
*   **Desktop:** Only the Right Column (Content) scrolls. The Image (Left) remains sticky.
*   **Mobile:** The entire card surface scrolls. The background mosaic is blurred and fixed.

---

## 4. Color System & Modes

### 4.1 Brand Palette (Variables)
*   `--brand-pink`: #FF00A8
*   `--brand-purple`: #9B00FF
*   `--brand-blue`: #0044FF
*   `--bg-black`: #000000 (or #050505 for less harsh contrast)
*   `--text-white`: #FFFFFF
*   `--text-muted`: #A1A1AA (Gray-400)

### 4.2 Modes
*   **Monochrome:** Default.
*   **Neon:** Active state (high saturation gradients).
*   **Glass:** UI Overlays (Backdrop blur 20px, bg-black/30).

---

## 5. Technical Implementation Rules

### 5.1 React Components
*   **Atom:** `Tile.tsx` (Pure presentation).
*   **Molecule:** `Modal.tsx` (Layout controller).
*   **Organism:** `Wall.tsx` (Grid logic).

### 5.2 Tailwind Best Practices
*   **Typography:** Use `text-balance` on titles to prevent widows.
*   **Z-Index:**
    *   Mosaic: `z-0`
    *   Overlay/Blur: `z-40`
    *   Modal Content: `z-50`
    *   Navigation/Close: `z-55`

### 5.3 Motion (Framer Motion)
*   **Entrance:** `duration: 0.6, ease: [0.16, 1, 0.3, 1]` (Expo Out).
*   **Exit:** `duration: 0.4, ease: [0.16, 1, 0.3, 1]`.
*   Avoid linear easing for UI elements.

---

## 6. Developer Checklist for Commits
1.  Did I break the Mosaic geometry? (Check corners).
2.  Does the Modal title overlap the close button on Mobile?
3.  Is the scroll locked on the `<body>` when the modal is open?
4.  Are images using `object-cover` inside their masks?
