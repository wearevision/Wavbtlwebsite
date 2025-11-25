1. General Principles

These rules apply globally to the entire template and all derivative files:

1.1 Simplicity & Scalability
	•	Prefer flexible, responsive structures over fixed or absolute positioning.
	•	Use Auto Layout and Layout Grids whenever possible.
	•	Keep layers minimal and clean; avoid unnecessary nesting.

1.2 Consistency
	•	Maintain consistent geometry, spacing, color logic, and naming.
	•	Reuse and modify existing components instead of creating duplicates.

1.3 Editability
	•	Every property (colors, spacing, angles, overlays, masks) must be easy to adjust.
	•	Designers should be able to replace imagery or change the number of tiles without breaking the mosaic.

1.4 Performance
	•	Keep vector masks simple and optimized.
	•	Reduce frame complexity and avoid excessive effects layers.

⸻

2. Infinite Mosaic System

This is the core logic that defines how the homepage visual behaves.

2.1 Geometry
	•	All tiles must be identical trapezoids.
	•	Left and right vertical edges must share the same inward angle (~17°).
	•	Horizontal edges must remain perfectly parallel.
	•	No tile should rotate independently—only the entire mosaic wall rotates.

2.2 Infinite Wall Behavior
	•	The mosaic must extend beyond the frame in all directions.
	•	No edges should be visible; the mosaic should feel endless.
	•	Duplicate the grid outward to ensure it fills overflow areas.

2.3 Spacing Rules
	•	Maintain a uniform spacing between every tile: 2–4 px max.
	•	Spacing must be equal both horizontally and vertically.
	•	Never allow tiles to touch or form uneven gaps.

2.4 Tile Content
	•	Every tile contains:
	•	A trapezoid vector mask
	•	A monochrome event image (Scale to Fill)
	•	Hover overlay layer (gradient or color mode)
	•	Optional dynamic states (active, selected, expanded)

2.5 Image Rules
	•	All imagery must remain black-and-white unless in hover state.
	•	Use high-contrast photography with clear subjects.
	•	Maintain crisp, non-distorted crops inside the trapezoid mask.

⸻

3. Interaction & Motion Guidelines

3.1 Hover State
	•	Scale tile to 110% while retaining the trapezoid mask.
	•	Apply a gradient overlay with ~65% opacity.
	•	Use color variables for overlays (pink, purple, blue).
	•	Keep motion smooth using standardized easing curves.

3.2 Mosaic Motion
	•	Cursor movement must influence the entire mosaic:
	•	Z-axis rotation reacts to X-position.
	•	Vertical parallax reacts to Y-position.
	•	Use motion variables for consistency across animations.

3.3 Expanded Card

When a tile is clicked:
	•	Display a 5:1 trapezoidal card above the mosaic.
	•	Expanded card includes:
	•	Trapezoidal video container
	•	Thumbnail sub-gallery
	•	Title text
	•	Descriptive paragraph
	•	The mosaic behind the modal must blur at 20% Gaussian blur.
	•	Do not blur UI elements or the modal itself.

⸻

4. Color System & Modes

4.1 Brand Colors

Use Figma Variables:
	•	Pink: #FF00A8
	•	Purple: #9B00FF
	•	Blue: #0044FF
	•	White: #FFFFFF
	•	Black: #000000

4.2 Neutral Colors
	•	Gray100 #F1F1F1
	•	Gray500 #7A7A7A
	•	Gray900 #111111

4.3 Color Modes

Each mode must be available through variable sets.

Monochrome Mode
	•	Default mode for all imagery.
	•	No color except on hover overlays.

Neon Mode
	•	High-saturation gradients.
	•	Optional glow-layer effect (soft outer glow).
	•	Intended for high-energy scenes.

Duotone Mode
	•	Replace shadows with dark neutral and highlights with bright neutral.
	•	Useful for content unification.

Glass Mode
	•	Translucent overlays.
	•	Backdrop blur (10–12 px).
	•	Muted colors for subtle interactions.

⸻

5. Component Architecture

5.1 Tile Component
	•	Trapezoid mask (vector)
	•	Image slot
	•	Overlay slot
	•	Interactive states
	•	Should scale without skewing geometry

5.2 Mosaic Frame
	•	Repeating pattern of tile instances
	•	Uses Grid Layout or manual duplication
	•	Hidden overflow edges to simulate infinite wall

5.3 Expanded Card Component
	•	Parent trapezoid with 5:1 ratio
	•	Inner masked containers (video + gallery)
	•	Text content arranged via Auto Layout
	•	Z-index above all mosaic layers

⸻

6. Layout & Auto Layout Guidelines

6.1 Auto Layout Rules
	•	Use vertical or horizontal auto-layout stacks only where helpful.
	•	Keep spacing governed by variables (2–4 px).
	•	Use “Scale” constraints for trapezoid shapes.
	•	Ensure expanded card adapts fluidly to different screen sizes.

6.2 Responsive Behavior
	•	Tiles scale proportionally when the frame resizes.
	•	Mosaic should preserve the trapezoid geometry at all breakpoints.
	•	Expanded card should center and adapt to mobile width.
	•	Never distort the trapezoid geometry during responsive adjustments.

⸻

7. Effects & Blur Rules

7.1 Mosaic Blur (Modal Active)
	•	Use 20% Gaussian blur.
	•	Optionally add a dim overlay (~30% black).
	•	Blur only the mosaic, not the UI or modal content.

7.2 Glow Effects (Neon Mode)
	•	Use soft, diffuse glow effects, never sharp halos.

⸻

8. Naming & File Organization

8.1 Component Naming
	•	Tile / Default
	•	Tile / Hover
	•	Tile / Selected
	•	Tile / Expanded
	•	Modal / Expanded Trapezoid
	•	System / Mosaic Wall

8.2 Page Organization
	•	Page 1: Components
	•	Page 2: Color Modes & Variables
	•	Page 3: Mosaic System
	•	Page 4: Prototype Interactions
	•	Page 5: Export Frames

8.3 Layer Naming
	•	Use clear, semantic naming.
	•	Avoid overly nested structures.

⸻

9. Template Usage Guidelines
	•	Feel free to change images, swap color modes, adjust spacing, or scale the mosaic.
	•	The system should remain stable under:
	•	Tile addition or removal
	•	Responsive resizing
	•	Color mode toggles
	•	Interaction changes
	•	Always preserve the trapezoid geometry and spacing logic.

⸻

10. Best Practices for Remixing This Template
	•	Always start from existing components instead of creating new shapes.
	•	Use Variables instead of manual color edits.
	•	Keep hover and active states consistent across all tiles.
	•	Maintain the infinite-wall illusion by duplicating the mosaic outward.
	•	Check spacing whenever adding new rows or columns.

⸻

11. What This Template Should Never Do
	•	Never use inconsistent trapezoid angles.
	•	Never distort images by stretching instead of “Scale to Fill.”
	•	Never mix spacing values.
	•	Never rotate individual tiles independently.
	•	Never reveal raw rectangular images outside the mask.

⸻

12. Quality Bar

Every exported frame or prototype should look:
	•	Cinematic
	•	Geometric
	•	Polished
	•	Professional
	•	Emotionally expressive
	•	Cohesive with WAV identity