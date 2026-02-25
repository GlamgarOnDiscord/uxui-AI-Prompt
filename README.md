# uxui-AI-Prompt

> A Claude Code agent system that generates premium, dark-mode first SaaS interfaces — powered by a battle-tested design system and Gemini image generation.

<p align="center">
  <img src="https://img.shields.io/github/stars/GlamgarOnDiscord/uxui-AI-Prompt?style=social" alt="GitHub Stars" />
  <img src="https://img.shields.io/github/issues/GlamgarOnDiscord/uxui-AI-Prompt" alt="Issues" />
  <img src="https://img.shields.io/github/forks/GlamgarOnDiscord/uxui-AI-Prompt?style=social" alt="Forks" />
  <img src="https://img.shields.io/badge/license-Open%20with%20credit-blue.svg" alt="License: Open with Credit" />
  <img src="https://img.shields.io/badge/Claude%20Code-Agents-8a42f4" alt="Claude Code Agents" />
  <img src="https://img.shields.io/badge/Image%20Gen-Gemini-4285F4" alt="Gemini Image Generation" />
  <img src="https://img.shields.io/badge/built%20by-GlamgarOnDiscord-8a42f4" alt="Author" />
</p>

---

## 🚀 Overview

**uxui-AI-Prompt** is a Claude Code agent system for building premium SaaS interfaces. It provides two specialized agents that work together: a `ux-ui-designer` agent that generates complete, production-ready UI code, and an `image-generator` agent that automatically replaces all image placeholders with Gemini-generated visuals.

The system is inspired by industry leaders like **Vercel, Linear, Stripe, and Raycast** — dark-mode first, animation-driven, and grounded in real engineering constraints.

---

## 🏗️ Architecture

```
uxui-AI-Prompt/
├── prompt.md              ← Standalone system prompt (ChatGPT, Copilot, etc.)
└── .claude/
    ├── ux-ui-designer.md  ← Main Claude Code agent
    └── image-generator.md ← Satellite agent (Gemini-powered)
```

### Agent Pipeline

```
User request
     │
     ▼
┌─────────────────────┐
│   ux-ui-designer    │  React/Next.js · Tailwind · Framer Motion
│   (Claude Opus)     │  Design system · Dials · Anti-patterns
└──────────┬──────────┘
           │  page complete → invokes automatically
           ▼
┌─────────────────────┐
│  image-generator    │  Gemini API · Cinematic prompts
│  (Claude Opus)      │  Hero bg · Feature cards · Avatars · Logos
└─────────────────────┘
```

---

## ✨ Key Features

### 🎛️ Design Dials System
Three global variables that drive every layout, motion, and density decision — no manual tuning needed:

| Dial | Default | Scale |
|------|---------|-------|
| `DESIGN_VARIANCE` | **8** | 1 = Perfect symmetry → 10 = Artsy chaos |
| `MOTION_INTENSITY` | **6** | 1 = Static → 10 = Cinematic physics |
| `VISUAL_DENSITY` | **4** | 1 = Art gallery airy → 10 = Cockpit packed |

The agent adapts automatically — change a dial in chat and the whole output shifts accordingly.

### 🎨 Design System
- **Dark-mode first** — Zinc/Slate palette, never pure black or neon
- **Multi-font system** — Geist, Satoshi, Cabinet Grotesk + Geist Mono for data
- **Component library** — Shimmer Buttons, Bento Grids, Liquid Glass Cards, Marquees, Accordions
- **Strict anti-patterns** — No Web3 glows, no neon accents, no centered heroes, no `h-screen`
- **WCAG AAA** contrast targets (7:1 normal text, 4.5:1 large text)

### 🎬 Advanced Motion Patterns (MOTION_INTENSITY ≥ 7)
Six autonomous animation patterns for feature cards — each with its own infinite loop, never two identical:

| Pattern | Description |
|---------|-------------|
| **Ghost Cursor Demo** | SVG cursor moves autonomously, clicks real UI components |
| **Type-Delete-Retype** | Code block rewrites itself between languages (TS → Python → Go) |
| **Algorithm Visualizer** | Data structure animates step-by-step with highlight sweep |
| **Live Property Editor** | Code editor types → preview component morphs in real time |
| **Autonomous Dashboard** | KPI counters spring to new values as dropdown cycles time periods |
| **Morphing Hero Metric** | Large stat cross-fades between KPIs with character scramble |

### 🖼️ Gemini Image Generation
The `image-generator` agent runs automatically at the end of every build:
1. **Audits** all image zones (hero bg, feature cards, avatars, logos, section atmospheres)
2. **Crafts** narrative, cinematic Gemini prompts tailored to each zone
3. **Generates** via `gemini-3-pro-image-preview` at appropriate resolutions
4. **Integrates** the results back into the HTML/JSX with correct overlays and `alt` attributes
5. **Falls back gracefully** — keeps placeholders with `<!-- TODO: Gemini prompt -->` comments if the API is unavailable

---

## 🛠️ Getting Started

### With Claude Code (Recommended)

```bash
git clone https://github.com/GlamgarOnDiscord/uxui-AI-Prompt.git
cd uxui-AI-Prompt
```

The `.claude/` folder is automatically detected by Claude Code. Just open the project and invoke the agent:

```
/ux-ui-designer
```

For image generation (runs automatically, or manually):
```
/image-generator
```

**Optional — Gemini image generation:**
```bash
pip install google-genai
export GEMINI_API_KEY="your-key-here"
```

### With Other AI Tools (ChatGPT, Copilot, etc.)

Copy the contents of [`prompt.md`](./prompt.md) and paste it as a system prompt in your AI tool of choice. The full design system, dials, anti-patterns, and workflow are self-contained in that file.

---

## 💡 Usage Example

Start a session with Claude Code in this project and describe what you want to build:

```
Build a landing page for a developer analytics SaaS.
Tech stack: Next.js + Tailwind. Dark mode. Emphasize the real-time dashboard.
```

The `ux-ui-designer` agent will:
1. Ask 5 scoped onboarding questions
2. Choose the right design dials for the use case
3. Generate a complete page (min. 7 sections) with animations, accessibility, and social proof
4. Invoke `image-generator` to replace all placeholders with Gemini visuals

---

## 📦 Tech Stack Supported

| Category | Options |
|----------|---------|
| Framework | React · Next.js App Router (preferred) · Static HTML/CSS/JS |
| Styling | Tailwind CSS (mandatory) |
| Animation | Framer Motion · GSAP/ScrollTrigger · Tailwind Animate |
| Icons | `@phosphor-icons/react` (preferred) · `lucide-react` · HugeIcons |
| Components | Magic UI · Aceternity UI · ShadCN UI · Reactbits |
| Images | Gemini `gemini-3-pro-image-preview` |

---

## 🤝 Contributing

Pull Requests, ideas, and issues are always welcome!
1. Fork the repo
2. Create your branch: `git checkout -b my-feature`
3. Submit your PR

You can improve the design system, add new motion patterns, add satellite agents, or improve the Gemini prompting logic.

---

## 📜 License

**Open License**
Use, modify, and share this project freely with mandatory credit to [GlamgarOnDiscord/uxui-AI-Prompt](https://github.com/GlamgarOnDiscord/uxui-AI-Prompt).

---

*Build interfaces that feel alive — with the precision of a senior engineer and the eye of a creative director.*
