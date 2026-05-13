---
name: Tina.io
description: Documentation, blog, and marketing site for TinaCMS
colors:
  tina-orange: "#EC4815"
  tina-orange-hover: "#D13F13"
  tina-orange-light: "#FFD3C1"
  tina-orange-warm: "#FF724B"
  tina-blue: "#0084FF"
  tina-blue-hover: "#0574E4"
  tina-blue-light: "#DCEEFF"
  tina-blue-deep: "#144696"
  tina-blue-midnight: "#1D2C6C"
  seafoam: "#93E9BE"
  seafoam-light: "#EEFDF9"
  seafoam-mist: "#E6FAF8"
  slate-background: "#F8FAFC"
  slate-surface: "#F1F5F9"
  warm-surface: "#FAEBE5"
  slate-text: "#0F172A"
  slate-text-muted: "#64748B"
  slate-border: "#CBD5E1"
  slate-border-subtle: "#E2E8F0"
typography:
  display:
    fontFamily: "IBMPlexSans-SemiBold, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
  headline:
    fontFamily: "IBMPlexSans-SemiBold, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "IBMPlexSans-SemiBold, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.33
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBMPlexSans-Medium, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  code:
    fontFamily: "SourceCodePro-Regular, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.33
rounded:
  sm: "2px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "144px"
components:
  button-orange:
    backgroundColor: "{colors.tina-orange}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-orange-hover:
    backgroundColor: "{colors.tina-orange-hover}"
    textColor: "#F9FAFB"
  button-blue:
    backgroundColor: "{colors.tina-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-seafoam:
    backgroundColor: "{colors.seafoam-light}"
    textColor: "{colors.tina-orange}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.tina-orange}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  badge-orange:
    backgroundColor: "{colors.tina-orange}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  badge-blue:
    backgroundColor: "{colors.tina-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  input-default:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.slate-text}"
    rounded: "5px"
    padding: "10px 16px"
---

# Design System: Tina.io

## 1. Overview

**Creative North Star: "The Friendly Forge"**

Tina.io is a workshop where things get built. The visual system carries the warm glow of creative energy: an orange hearth at the center, blue structural steel around it, and seafoam coolant for breathing room. It is friendly without being childish, bold without being loud, and technical without being cold. The llama mascot sets the emotional register: a project that takes its craft seriously but greets you with a grin.

The system rejects enterprise formality (no committee-designed gray expanses), generic SaaS templates (no interchangeable hero + features + pricing grids), hacker/terminal aesthetics (no neon-on-black gatekeeping), and overdesigned startup excess (no gratuitous 3D, no parallax for its own sake). Every visual choice should feel like it was made by a person who builds things, for people who build things.

**Key Characteristics:**
- Warm gradients and blue-tinted shadows create depth without heaviness
- IBM Plex Sans brings industrial clarity to headings; Inter keeps body text effortless
- Pill-shaped interactive elements (buttons, badges) feel tactile and inviting
- Generous section spacing gives content room to breathe; the site never feels cramped
- Orange is the spark of action; blue is the structure of trust; seafoam is the moment of calm

## 2. Colors: The Forge Palette

A full-palette strategy with three named roles, each carrying distinct meaning. Orange ignites action, blue builds trust, seafoam provides relief. Neutrals are slate-tinted, never pure gray.

### Primary

- **Tina Orange** (#EC4815): The brand signature. CTAs, emphasis, hover glows, the pulse of every interactive moment. Warm and assertive without veering into alarm-red territory.
- **Tina Orange Hover** (#D13F13): Deepened on press/hover for tactile feedback. One step darker, same hue family.
- **Tina Orange Light** (#FFD3C1): Background wash for subtle orange-tinted surfaces. Callouts, soft highlights.
- **Tina Orange Warm** (#FF724B): The lighter gradient stop. Used in gradient fills on primary buttons and hero accents, never standalone.

### Secondary

- **Tina Blue** (#0084FF): Navigation, headings rendered as gradients, links, secondary CTAs. The structural color: it holds the information architecture together.
- **Tina Blue Hover** (#0574E4): Interaction state for blue elements.
- **Tina Blue Light** (#DCEEFF): Tinted background for blue badges, soft info panels.
- **Tina Blue Deep** (#144696): Dark gradient stop for heading text gradients (`from-blue-600 via-blue-800 to-blue-1000`).
- **Tina Blue Midnight** (#1D2C6C): The deepest blue. Gradient terminus, footer tones, maximum contrast within the blue family.

### Tertiary

- **Seafoam** (#93E9BE): Accent breather. Button variants, subtle highlights, selection backgrounds. Used sparingly to cool the palette.
- **Seafoam Light** (#EEFDF9): Whisper-level tint for backgrounds that need differentiation without weight.
- **Seafoam Mist** (#E6FAF8): Text selection background, nav dropdown tint (#ECF7F8 in practice). The coolest surface in the system.

### Neutral

- **Slate Background** (#F8FAFC): Page-level background. Not white, not gray: a blue-tinted off-white that keeps the eye comfortable.
- **Slate Surface** (#F1F5F9): Secondary backgrounds, alternating sections, sidebar fills.
- **Warm Surface** (#FAEBE5): Orange-tinted surface for branded sections. Used on `neutral-surface` to warm specific containers.
- **Slate Text** (#0F172A): Primary body text. Near-black with a cool slate undertone, never pure #000.
- **Slate Text Muted** (#64748B): Secondary text, descriptions, meta labels. 46% lightness for clear hierarchy without disappearing.
- **Slate Border** (#CBD5E1): Visible borders on cards, dividers, table rules.
- **Slate Border Subtle** (#E2E8F0): Hairline borders that separate without drawing attention.

### Named Rules

**The Forge Glow Rule.** Orange appears on no more than 15% of any screen outside hero sections. Its power comes from scarcity. When everything glows, nothing does.

**The Blue Structure Rule.** Blue carries navigation, headings, and trust signals (pricing, feature comparisons). It is never decorative. If a blue element doesn't orient or inform, it doesn't belong.

## 3. Typography

**Display Font:** IBM Plex Sans SemiBold (with Inter, system-ui fallback)
**Body Font:** Inter (with system-ui fallback)
**Code Font:** Source Code Pro Regular (with ui-monospace fallback)

**Character:** IBM Plex Sans brings the precision of an engineering blueprint to headings: geometric, industrial, confident. Inter disappears into body text exactly as it should, letting the content lead. The pairing is workbench over showroom: functional tools, well-made.

### Hierarchy

- **Display** (700, clamp(2.25rem, 5vw, 3.75rem), line-height 1.1): Hero headlines only. IBM Plex Sans SemiBold at maximum scale. Used with gradient text fills in blue or orange for visual weight.
- **Headline** (600, clamp(1.875rem, 4vw, 3rem), line-height 1.2): Section headings (H2). IBM Plex Sans SemiBold. The workhorse heading level that anchors every content block.
- **Title** (600, clamp(1.25rem, 2.5vw, 1.875rem), line-height 1.33): Feature headings (H3), card titles. IBM Plex Sans SemiBold. Tight leading for compact card layouts.
- **Body** (400, 1rem/16px, line-height 1.5): All running text. Inter at normal weight. Max line length enforced at 65ch where layout allows.
- **Label** (500, 0.875rem/14px, line-height 1.43): Navigation links, button text, form labels, meta information. IBM Plex Sans Medium. The UI voice.
- **Code** (400, 0.8125rem/13px, line-height 1.33): Inline code, version numbers, package names, technical references. Source Code Pro. Often paired with uppercase tracking-widest for table headers.

### Named Rules

**The Two-Family Rule.** IBM Plex for structure (anything the user scans), Inter for content (anything the user reads). Never mix them within a single text block. Source Code Pro is reserved strictly for technical literals.

## 4. Elevation: The Blue Shadow System

Shadows carry a distinctive blue tint (rgba(20, 70, 150, x)) rather than neutral gray. This keeps elevated surfaces feeling warm and integrated with the blue-heavy palette rather than floating in generic space. The system is ambient + interactive: cards carry subtle resting shadows, and interaction deepens them.

### Shadow Vocabulary

- **Ambient Low** (`0 1px 3px 0 rgba(20, 70, 150, 0.05)`): Resting state for minor elevations. Subtle enough to feel flat at a glance, present enough to separate from the background.
- **Ambient Default** (`0 1px 3px 0 rgb(20 70 150 / 0.07), 0 2px 6px -1px rgb(20 70 150 / 0.07)`): Standard card and container elevation. The default resting shadow for most surfaces.
- **Ambient High** (`0 10px 15px -3px rgb(20 70 150 / 0.1), 0 4px 6px -4px rgb(20 70 150 / 0.1)`): Feature cards, testimonial blocks, prominent containers. Hover targets often transition from Default to High.
- **Panel** (`6px 4px 16px rgba(0,132,255, 0.07), 10px 8px 32px rgba(0,132,255, 0.07), 18px 16px 64px rgba(0,132,255, 0.1)`): Maximum elevation for feature showcases and enabled-state panels. Three-layer blue glow that feels luminous, not heavy.
- **Input Resting** (`inset 0 0 0 1px rgba(0, 0, 0, 0.08), 0px 2px 3px rgba(0, 0, 0, 0.12)`): Form fields at rest. Inset border + subtle outer shadow creates a recessed look.
- **Input Focus** (`inset 0 0 0 1px rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(236, 72, 21, 0.7), 0 2px 3px rgba(0, 0, 0, 0.12)`): Orange focus ring at 70% opacity. The forge glow on inputs: unmistakable, warm, branded.

### Named Rules

**The Blue Tint Rule.** All ambient shadows use the blue channel (20, 70, 150), never neutral gray. This binds the elevation system to the brand palette. The exception is input shadows, which use neutral black for the inset border and brand orange for the focus ring.

## 5. Components

### Buttons

Warm and responsive. Buttons feel like they have physical presence: gradient fills, pill shapes, and a subtle translate-on-hover that mimics being pressed into a surface.

- **Shape:** Pill (rounded-full / 9999px) for primary actions; squared (rounded-md / 6px) for secondary contexts
- **Orange (Primary CTA):** Gradient fill from-orange-400 to-orange-600, white text, IBM Plex Sans Medium. Padding 10px 24px (medium), scaling up to 12px 32px (large).
- **Blue:** Gradient fill from-blue-300 via-blue-400 to-blue-600, white text. Used for secondary CTAs alongside orange.
- **Seafoam:** Gradient from-seafoam-50 to-seafoam-150, orange-600 text. Soft alternative that still ties back to the primary accent.
- **Ghost:** Transparent background, orange-500 text, no border. For tertiary actions and inline links.
- **Hover / Focus:** All buttons translate -1px on Y and X axes on hover (float up and left), +1px on active (press down). Transition 150ms ease-out. Focus ring via shadow-outline (3px rgba(66, 153, 225, 0.5)).
- **Disabled:** 50% opacity, cursor-not-allowed, pointer-events-none.

### Badges

- **Style:** Pill-shaped (rounded-full), IBM Plex Sans Medium, border matching fill color
- **Orange:** bg-brand-primary, white text, brand-primary border. For status, categories, CTAs.
- **Blue:** bg-brand-secondary, white text, brand-secondary border. For informational labels.
- **Ghost variants:** Inverted (white background, colored border and text) for lower emphasis.
- **Sizes:** Default (px-3.5 py-1.5), medium (px-3), small (px-1).

### Cards / Containers

Feature cards use gradient white backgrounds with blue-tinted ambient shadows. They feel like frosted glass over the page surface.

- **Corner Style:** Rounded-lg (8px) for standard cards, rounded-xl (12px) for nav dropdowns, rounded-2xl (16px) for major feature containers
- **Background:** `bg-gradient-to-br from-white via-white to-white/50` for the frosted effect. Some cards use `from-white/25 via-white/50 to-white/75` for lighter frosting.
- **Shadow Strategy:** Ambient Default at rest, transitioning to Ambient High on hover. Feature showcases use Panel shadow.
- **Border:** `border border-gray-200/80` when explicit separation is needed; most cards rely on shadow alone.
- **Internal Padding:** Scales responsively: py-6 px-8 (mobile) to py-12 px-14 (desktop). Generous, never cramped.
- **Hover:** `hover:shadow-lg hover:scale-[1.01] transition-all duration-150 ease-out` for interactive cards.

### Inputs / Fields

- **Style:** White background, no visible border (uses inset shadow instead), rounded 5px. IBM Plex Sans for text, h-10 (40px).
- **Focus:** Orange glow ring (0 0 0 3px rgba(236, 72, 21, 0.7)). The signature forge-glow interaction. Transition 85ms ease-out for snappy response.
- **Hover:** Lighter orange ring preview (0 0 0 3px rgba(236, 72, 21, 0.2)) before full focus.
- **Disabled:** 50% opacity, not-allowed cursor.

### Navigation

The navbar is the site's structural backbone: blue text, seafoam dropdown backgrounds, and a sticky header that blurs in on scroll.

- **Desktop links:** text-blue-700 hover:text-blue-500, text-base font-medium, drop-shadow-sm for subtle text depth. 150ms ease-out transitions.
- **Dropdown:** bg-[#ECF7F8] (seafoam-adjacent), rounded-xl, shadow-lg. Items hover to white/60 with 150ms transitions.
- **Sticky header:** Gradient from seafoam-tinted to blue-tinted transparent (from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)]), backdrop-blur-sm, shadow-sm. Slides in from top with animate-slide-in.
- **Mobile:** Slide-out panel (300px), gradient from-blue-50 to-white, shadow-2xl. Orange text for menu trigger. 200ms ease-out transitions.

### Footer (Signature Component)

The footer is the boldest surface in the system: a full-bleed orange SVG background with white uppercase navigation. IBM Plex Sans SemiBold, text-lg to text-xl, with hover physics (translate + drop-shadow glow). Category headers in orange-300/70 uppercase tracking-wider at text-xs. The SSW partnership banner at the bottom uses a diagonal gradient (black to #CC4141) with scale-on-hover animation.

## 6. Do's and Don'ts

### Do:

- **Do** use blue-tinted shadows (rgba(20, 70, 150, x)) for all ambient elevation. The blue channel ties shadows to the brand palette.
- **Do** use gradient fills (bg-gradient-to-br) for buttons and card backgrounds. The site's depth comes from layered white gradients, not flat fills.
- **Do** let orange lead every CTA. One orange action per content block is the target density.
- **Do** use IBM Plex Sans for anything the user scans (headings, nav, labels) and Inter for anything the user reads (paragraphs, descriptions, docs content).
- **Do** give sections generous vertical spacing (144px section padding). Breathing room is part of the brand.
- **Do** use pill shapes (rounded-full) for primary buttons and badges. The rounded vocabulary is core to the approachable feel.
- **Do** apply translate physics on interactive elements (hover: -1px Y/X, active: +1px). This tactile motion is the "warm and responsive" signature.
- **Do** respect WCAG AA contrast. 4.5:1 minimum for text, keyboard navigable, reduced-motion support.

### Don't:

- **Don't** use pure black (#000000) or pure white (#FFFFFF) for backgrounds or text. Tint neutrals toward slate. The page background is #F8FAFC, the text is #0F172A.
- **Don't** build generic SaaS landing page templates. No interchangeable hero + three feature cards + pricing grid layouts. Every page should feel like it was designed for TinaCMS specifically.
- **Don't** adopt enterprise/corporate visual language. No dense feature matrices, no gray-on-gray conservatism, no "contact sales" energy.
- **Don't** use hacker/terminal aesthetics. No dark mode with neon accents, no monospace-everything, no "built for 10x devs" gatekeeping. TinaCMS is for everyone who builds on the web.
- **Don't** overdesign with gratuitous 3D, excessive parallax, or animations that compete with content. The design serves the content, not the other way around.
- **Don't** use border-left or border-right greater than 1px as colored accent stripes on cards, alerts, or callouts.
- **Don't** use neutral gray shadows. The blue-tinted shadow system is deliberate; gray shadows will feel disconnected.
- **Don't** use em dashes anywhere in copy. Use commas, colons, semicolons, or periods.
- **Don't** flatten the typography hierarchy. The gap between Display (3.75rem) and Body (1rem) is intentional. Maintain at least a 1.25x ratio between adjacent levels.
