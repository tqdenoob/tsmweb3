# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 web application (App Router) using React 19, Tailwind CSS v4, and ESLint v9. JavaScript (not TypeScript). Created with `create-next-app`.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm start          # Serve production build
npm run lint       # Run ESLint
```

## Architecture

- **App Router** with React Server Components (RSC) by default. Add `"use client"` directive for client components.
- **Routing**: File-based under `app/`. Each `page.js` defines a route, `layout.js` defines shared layout boundaries.
- **Styling**: Tailwind CSS v4 via PostCSS. Global styles and CSS custom properties for theming in `app/globals.css`. Dark mode uses `prefers-color-scheme` media query.
- **Fonts**: Google Fonts (Geist, Geist Mono) loaded via `next/font/google` with CSS variable injection in root layout.
- **Path alias**: `@/*` maps to the project root (configured in `jsconfig.json`).
- **Static assets**: Served from `public/`.
