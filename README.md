# Hans James | Systems Engineer Portfolio

> A high-performance, component-driven portfolio designed with a "Systems Engineering" aesthetic. Built to showcase low-latency architectures, distributed systems, and backend engineering skills.

![Project Preview](public/file.svg) ## ⚡ Overview

This portfolio is not just a static site; it's a reflection of my engineering identity. It moves away from standard web design tropes to embrace a **terminal-first, industrial, and schematic visual language**. It features a fully interactive command-line interface, keyboard-driven navigation, and technical visualizations of my backend projects.

**Live Demo:** [https://hans-systems.vercel.app](https://hans-systems.vercel.app) *(Replace with your actual URL)*

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Components)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **UI Components:** [Lucide React](https://lucide.dev/), [CMDK](https://github.com/pacocoursey/cmdk) (Command Palette)
* **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Key Features

* **Interactive Terminal:** A fully functional, ZSH-inspired terminal overlay accessible via the navbar. Supports commands like `ls`, `cd`, `cat`, `whoami`, and `neofetch`.
* **Command Palette:** System-wide command menu triggered by `Cmd+K` (or `Ctrl+K`) for rapid navigation and actions.
* **"Schematic" Visuals:** Projects are represented with technical, wireframe-style CSS/SVG animations rather than generic screenshots.
* **Typewriter Hero:** A dynamic landing page introducing my focus on low-latency and distributed systems.
* **VS Code Component:** An "IDE-like" bio section written in Java syntax to highlight backend proficiency.
* **Dark Mode Native:** Designed exclusively in a high-contrast dark theme (`#0a0a0a`) with Emerald (`#10b981`) accents.

## 📂 Project Structure

```bash
sys-eng-portfolio/
├── app/                # Next.js App Router pages
│   ├── about/          # About page with VS Code visual
│   ├── work/           # Projects showcase
│   ├── layout.tsx      # Root layout & providers
│   └── page.tsx        # Hero landing page
├── components/         # React components
│   ├── Terminal.tsx    # Interactive terminal logic
│   ├── Projects.tsx    # Project cards & visualizations
│   ├── CommandPalette.tsx # Cmd+K implementation
│   └── ...
├── context/            # Global state (Terminal visibility)
├── public/             # Static assets (Resume, SVGs)
└── styles/             # Global CSS & Tailwind config