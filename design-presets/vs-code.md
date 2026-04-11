# DESIGN.md — VS Code Preset

> Editor-dark. Syntax-rainbow accents. Monospace-first.

## Theme
**Atmosphere:** IDE-native — built by developers, for developers, inside a code editor.
**Mood:** Technical, trustworthy, information-dense. Feels like home for engineers.

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#1e1e1e` | Editor background |
| `--bg-surface` | `#252526` | Sidebar, panels |
| `--bg-elevated` | `#2d2d2d` | Hover, tabs |
| `--bg-active` | `#37373d` | Active tab, selection |
| `--border-subtle` | `#3e3e42` | Panel borders |
| `--text-primary` | `#d4d4d4` | Default text |
| `--text-secondary` | `#858585` | Comments, labels |
| `--text-tertiary` | `#5a5a5a` | Disabled |
| `--accent-blue` | `#569cd6` | Keywords, links |
| `--accent-green` | `#6a9955` | Strings, success |
| `--accent-orange` | `#ce9178` | Values |
| `--accent-yellow` | `#dcdcaa` | Functions |
| `--accent-purple` | `#c586c0` | Control flow |
| `--accent-cyan` | `#4ec9b0` | Types, classes |

**Rule:** Use syntax-highlighting colors semantically. Blue for navigation, green for success, orange for warnings, red for errors.

## Typography
| Role | Font | Weight |
|------|------|--------|
| All text | JetBrains Mono | 400 |
| Display | JetBrains Mono | 700 |
| Body | JetBrains Mono | 400 |

**Signature:** Everything is monospace. This is the defining trait.

## Spacing
Dense. Section padding: `py-12` / `py-16`.
Container: `max-w-6xl mx-auto px-4`.
Card padding: `p-3` / `p-4`. Compact like an editor.

## Motion
`MOTION_INTENSITY` override: **3**. Functional only.
Transitions: `100ms ease`. Instant feedback.
Tab switching: immediate. Panel resize: smooth drag.
No decorative animation.

## Signature Patterns
- Tab bar navigation (like editor tabs)
- Sidebar with tree/file explorer layout
- Status bar at bottom (colored segments)
- Minimap-style scroll indicators
- Inline code blocks everywhere
- Syntax-highlighted code snippets as hero content
- Terminal/output panel aesthetic
- Activity bar (icon sidebar)

## Banned
- Serif fonts
- Sans-serif body (everything monospace)
- Rounded-XL (max `rounded-sm`)
- Gradient backgrounds
- Playful/bouncy animations
- Generous whitespace (dense by nature)
