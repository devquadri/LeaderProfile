# Mohammed Riyazuddin — Portfolio

A clean, minimal personal portfolio website built with React, Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build tool**: Vite
- **Styling**: Tailwind CSS (with dark mode support)
- **Routing**: Wouter
- **Backend**: Express (minimal, serves static files in production)
- **ORM**: Drizzle ORM (PostgreSQL)

## Project Structure

```
EngineerProfile/
├── client/                 # React frontend
│   ├── index.html
│   └── src/
│       ├── data/
│       │   └── resume.ts   # All your personal data lives here
│       ├── pages/
│       │   └── Portfolio.tsx
│       ├── hooks/
│       ├── lib/
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── server/                 # Express backend
│   └── index.ts
├── shared/                 # Shared types
│   └── schema.ts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── drizzle.config.ts
```

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5000`.

## Adding Your Photo

Place your photo as `photo.jpg` inside the `client/public/` folder. It will automatically appear as the circular avatar in the hero section.

## Updating Your Data

All resume content is in `client/src/data/resume.ts`. Edit that file to update any section — experience, skills, achievements, contact info, etc.

## Production Build

```bash
npm run build
npm start
```
