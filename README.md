# Yes It's Clean — Landing Page

A premium, animated landing page for a cleaning service brand built with **Vite + React (TypeScript)** and **Tailwind CSS**.

## Highlights

- **Modern hero + sections**: Services, Gallery (Before/After), Reviews, About, Contact
- **Smooth navigation**: anchored sections + mobile menu overlay
- **Accessible touches**: focus management on mobile menu + contact form validation
- **Performance-minded**: lazy-loaded gallery images (with fallbacks)

## Tech Stack

- **Vite** (dev server / build)
- **React 19 + TypeScript**
- **Tailwind CSS**
- **motion** (animations)
- **lucide-react** (icons)

## Getting Started

### Prerequisites

- Node.js **18+** (recommended: latest LTS)
- npm (comes with Node)

### Install

```bash
npm install
```

### Run locally (dev)

```bash
npm run dev
```

Then open the URL shown in the terminal (default is usually `http://localhost:3000`).

### Build for production

```bash
npm run build
```

Output will be in `dist/`.

### Preview the production build

```bash
npm run preview
```

## Project Structure (quick)

- `src/App.tsx`: main landing page sections and UI
- `src/main.tsx`: app entry
- `index.html`: Vite HTML entry

## Notes

- The Contact form submission is currently **demo-only** (no backend wired).
- Images are currently loaded from external sources for demo purposes.

## License

Apache-2.0