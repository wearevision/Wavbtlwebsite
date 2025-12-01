# WAV BTL — Design System & Engineering Guidelines (v2.3.0)

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
*   **Rule:** The 17° angle must appear throughout the UI as a visual identity thread.

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

## 3. Expanded Card (Modal) — Awwwards-Level Architecture

### 3.1 Layout Strategy: The "Split & Stack"
The layout adapts drastically per breakpoint to preserve the content's hierarchy.

*   **Desktop (>1024px):** Asymmetric Split.
    *   Left (Visuals): Sticky, Full Height, Trapezoidal Cut (82% = 17°).
    *   Right (Content): Scrollable, Clean Typography, **Generous Padding (48px)**.
*   **Tablet (768px - 1024px):** Hybrid Stack.
    *   Top (Visuals): 45vh height.
    *   Bottom (Content): Scrollable.
*   **Mobile (<768px):** Vertical Flow.
    *   Top (Visuals): Aspect Ratio 4:5 or 1:1. Diagonal bottom cut.
    *   Bottom (Content): Full width, standard scroll.

### 3.2 Hierarchical Spacing System (NEW)
The modal uses a progressive spacing scale that creates editorial breathing room:

*   **Desktop:**
    *   Container Padding: `p-12` (48px) — Premium, spacious
    *   Header → Title: `gap-8` (32px)
    *   Title → Body: `gap-10` (40px)
    *   Body → Metadata: `gap-12` (48px)
    *   Metadata Grid: `gap-8` (32px)

*   **Mobile:**
    *   Container Padding: `p-8` (32px)
    *   Gaps reduced proportionally (×0.75)
    *   Responsive flex layout prevents collisions

### 3.3 Angular Identity Elements (NEW)
The 17° angle is applied throughout the modal:

*   **Image Panel:** Right-side trapezoidal cut (82% = 17°)
*   **Badge Component:** Trapezoidal `TrapezoidBadge` with angled edges
*   **Section Dividers:** Subtle `skewY(-0.5deg)` on separator lines
*   **Visual Language:** Angular dividers create rhythm and brand consistency

### 3.4 Content Constraints (Strict)
To maintain the "Cinematic" look, content **must** fit these constraints.

*   **H1 Title:**
    *   Max length: 60 characters.
    *   Scale: Fluid (Clamp) — `text-3xl md:text-4xl lg:text-5xl`
    *   Line-height: 1.0 (Tight but readable)
*   **Body Text:**
    *   Max length: 800 characters (approx 2 paragraphs).
    *   Line-height: 1.6 (Relaxed).
    *   Max-width: 60ch (Optimal reading measure).
*   **Logo:**
    *   Height: `h-10 md:h-12` (40-48px)
    *   Opacity: 90% resting, 100% on hover

### 3.5 Scroll Physics
*   **Global Body:** Locked (overflow-hidden) when Modal is open.
*   **Desktop:** Only the Right Column (Content) scrolls. The Image (Left) remains sticky.
*   **Mobile:** The entire card surface scrolls. The background mosaic is blurred and fixed.
*   **Scrollbar:** Custom thin scrollbar (6px) with subtle white/20% color.

### 3.6 Navigation Arrows (Desktop)
*   **Position:** Fixed left/right (24-40px from edges), vertically centered
*   **Style:** Circular buttons with gradient glow on hover
*   **Behavior:** Crossfade transition between events (1s duration)
*   **Spacing:** Positioned outside modal card to avoid content collision

### 3.7 Mobile Navigation (NEW)
*   **Swipe Gestures:** Left/Right swipe to navigate between events
*   **Threshold:** 50px minimum swipe distance, 500ms max duration
*   **Behavior:** Natural touch-based navigation, non-blocking vertical scroll
*   **Fallback:** Circular buttons visible for tap navigation

### 3.8 Keyboard Navigation (NEW)
*   **Arrow Keys:** `←` Previous event, `→` Next event
*   **Escape Key:** `Esc` closes modal
*   **Debounce:** 200ms to prevent rapid-fire navigation
*   **Smart Detection:** Ignores events from input/textarea elements
*   **Prevent Default:** Arrow keys don't scroll page
*   **Accessibility:** WCAG 2.1 AA compliant

### 3.9 Circular Navigation Buttons
*   **Design:** Circular SVG buttons (64px desktop, 56px mobile)
*   **Effect:** Gradient stroke fills on hover (pink → purple → blue)
*   **Animation:** 600ms Expo Out, strokeDasharray from 0 to 176
*   **Stroke Width:** 3px (thick, visible, premium feel)
*   **Glow:** Subtle radial gradient on hover
*   **Icon:** Chevron (24-28px) centered, scales 110% on hover

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
*   **Molecule:** `Modal.tsx` (Layout controller), `TrapezoidBadge.tsx` (Brand element).
*   **Organism:** `Wall.tsx` (Grid logic).
*   **Utility:** `AngularDivider.tsx` (Brand identity decorative elements).

### 5.2 Tailwind Best Practices
*   **Typography:** Use `text-balance` on titles to prevent widows.
*   **Spacing:** Use progressive scale (gap-8, gap-10, gap-12) for hierarchy.
*   **Z-Index:**
    *   Mosaic: `z-0`
    *   Overlay/Blur: `z-40`
    *   Modal Content: `z-50`
    *   Navigation/Close: `z-55`

### 5.3 Motion (Motion/React)
*   **Entrance:** `duration: 0.6, ease: [0.16, 1, 0.3, 1]` (Expo Out).
*   **Exit:** `duration: 0.4, ease: [0.16, 1, 0.3, 1]`.
*   **Crossfade:** `duration: 1.0, ease: "easeInOut"` for modal transitions.
*   Avoid linear easing for UI elements.

---

## 6. Asset Specifications (Production-Ready)

### 6.1 Images (3-Crop System)
For responsive art direction, deliver 3 crops per event:

1. **Desktop (Tile + Modal Left Panel):**
   - Aspect Ratio: 8:5 (1.6:1)
   - Resolution: 2400 x 1500px
   - Format: WebP + JPEG fallback
   - Quality: 85%
   - Weight: < 300KB

2. **Tablet (Hybrid Modal):**
   - Aspect Ratio: 16:9
   - Resolution: 1920 x 1080px
   - Format: WebP
   - Quality: 85%
   - Weight: < 250KB

3. **Mobile (Vertical Modal):**
   - Aspect Ratio: 4:5 (vertical)
   - Resolution: 1080 x 1350px
   - Format: WebP
   - Quality: 80%
   - Weight: < 200KB

### 6.2 Videos
*   **Codec:** H.264 (libx264)
*   **Container:** MP4
*   **Bitrate:** VBR 2-pass, 6 Mbps avg (max 10 Mbps)
*   **Resolution:** 1920x1080 (16:9)
*   **Framerate:** 30fps
*   **Audio:** AAC 192kbps, 48kHz, Stereo
*   **Encoding:** CRF 23, preset slow, profile high
*   **Flags:** +faststart (web streaming optimization)
*   **Weight:** < 15MB for videos <60s

---

## 7. Developer Checklist for Commits
1.  Did I break the Mosaic geometry? (Check corners).
2.  Does the Modal title overlap the close button on Mobile?
3.  Is the scroll locked on the `<body>` when the modal is open?
4.  Are images using `object-cover` inside their masks?
5.  Are spacing values following the hierarchical scale (gap-8, gap-10, gap-12)?
6.  Are angular identity elements (17° cuts) applied consistently?
7.  Do badge components use `TrapezoidBadge` with correct variant?

---

## 8. Changelog

### v2.3.0 (Current - Visual Feedback + Menu Fix)
*   ✅ **VISUAL FEEDBACK:** Keyboard navigation con confirmación visual
*   ✅ CircularNavButton pulsa y se llena al presionar teclas (← →)
*   ✅ Pulse animation (scale 1→1.1→1) en 300ms
*   ✅ Hook `useKeyboardNav` retorna estado `keyPressed` para feedback
*   ✅ **MENU FIX CRÍTICO:** Sistema z-index completamente refactorizado
*   ✅ Menu siempre sobre modal (z-[100] vs z-50)
*   ✅ Blur económico: SOLO en panel del menú, NO en backdrop
*   ✅ Controls siempre accesibles (z-[110])
*   ✅ Performance optimizada: -33% blur rendering
*   ✅ Zero conflictos de z-index

### v2.2.0 (Previous - Keyboard Navigation)
*   ✅ **NEW FEATURE:** Complete keyboard navigation implementation
*   ✅ Arrow keys (← →) for event navigation with 200ms debounce
*   ✅ Escape key closes modal
*   ✅ Smart detection: Ignores input/textarea elements
*   ✅ Prevent default scroll behavior on arrow keys
*   ✅ WCAG 2.1 AA accessibility compliance
*   ✅ Custom hook `useKeyboardNav` with TypeScript types
*   ✅ 100% input coverage: Keyboard + Mouse + Touch + Swipe

### v2.1.1 (Previous - Layout Fix)
*   ✅ **CRITICAL FIX:** Resolved close button collision with category badge
*   ✅ Optimized close button size (24px → 20px desktop) for less intrusion
*   ✅ Added header right padding (pr-12 = 48px) to reserve space for close button
*   ✅ Progressive logo scaling: 40px (mobile) → 48px (tablet) → 56px (desktop)
*   ✅ Refined header layout with `lg:ml-auto` for badge positioning
*   ✅ Consistent spacing system across all breakpoints

### v2.1 (Previous)
*   ✅ Refactored Modal with Awwwards-level spacing (p-12 desktop)
*   ✅ Implemented hierarchical gap system (gap-8 → gap-10 → gap-12)
*   ✅ Added Angular Dividers with `skewY(-0.5deg)` for brand identity
*   ✅ Fixed responsive header layout (flex-col → flex-row)
*   ✅ Enhanced navigation arrows with gradient glow
*   ✅ Improved TrapezoidBadge with backdrop-blur
*   ✅ Created `AngularDivider.tsx` utility component
*   ✅ Updated custom scrollbar styles (6px modal, 4px menu)
*   ✅ **NEW:** Implemented swipe gestures for mobile navigation (`useSwipe` hook)
*   ✅ **NEW:** Circular navigation buttons with gradient loading effect
*   ✅ **NEW:** SVG stroke animation (strokeDasharray 0→176, 600ms Expo Out)
*   ✅ **NEW:** Mobile-first navigation (swipe + tap fallback)

### v2.0 (Previous)
*   Established core Guidelines
*   Implemented "Split & Stack" modal architecture
*   Defined Cinematic Geometry philosophy