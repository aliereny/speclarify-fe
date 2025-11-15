# Speclarify Frontend

Speclarify is an AI-assisted requirements engineering workspace. This Next.js frontend guides product teams through uploading an SRS document, reviewing extracted requirements, cleaning duplicates and inconsistencies, resolving ambiguities, prioritizing, classifying, and exporting the refined specification. A parallel elicitation flow turns interview transcripts into candidate requirements.

## Features
- **Project dashboard** for creating and managing requirement refinement runs.
- **Eight-step workflow** (upload → review → deduplicate → resolve inconsistencies → fix ambiguities → prioritize → classify → export).
- **AI-assisted cards** that surface duplicate pairs, ambiguity suggestions, and classification inputs.
- **Interview elicitation** upload for extracting requirements directly from conversation transcripts.
- **Persistent local state** via Zustand so users can resume unfinished sessions.

## Architecture at a Glance
- [Next.js 13 App Router](https://nextjs.org/docs/app) with client components for interactive steps.
- State managed with persisted [Zustand](https://github.com/pmndrs/zustand) stores in `src/stores`.
- API access funneled through `src/data/axiosClient.ts` with token refresh logic.
- Ant Design UI shell, custom SCSS modules, and pre-generated theme CSS.
- Component taxonomy of atoms → molecules → organisms → templates.

Read the full architectural breakdown in `docs/architecture.md`.

## Prerequisites
- Node.js 18 or newer (matching Next.js 13 requirements).
- npm (recommended) or another Node package manager.
- Speclarify backend API with the endpoints consumed in the stores (`/login`, `/refresh`, `/projects`, `/projects/:id/requirements`, etc.).
- Environment variables:
	- `NEXT_PUBLIC_API_URL` — base URL for API calls. Defaults to `https://api.speclarify.com/api/v1` if unset.
	- `API_URL` — optional server-side export fallback used on the export step.

## Quick Start
```bash
git clone https://github.com/aliereny/speclarify-fe.git
cd speclarify-fe
npm install
cp .env.example .env.local    # create and edit with your API settings (file to be added by you)
npm run dev
```

- Visit `http://localhost:3000` to explore the dashboard.
- `npm run build` produces a production bundle.
- `npm run lint` must pass before opening a pull request.

## Workflow Overview
1. **Upload** ( `src/app/projects/[projectId]/(steps)/upload/page.tsx` ) — submit an SRS PDF via the custom file uploader.
2. **Review** — paginate requirements five at a time, edit or delete them, and add manual entries.
3. **Remove Duplicates** — compare duplicate pairs and delete unwanted records.
4. **Remove Inconsistencies** — resolve conflicting requirements using the same paired-card UI.
5. **Fix Ambiguities** — accept AI hints to rewrite unclear requirements.
6. **Prioritize** — assign High/Medium/Low priority per requirement.
7. **Classify** — set requirement class and subclass categories.
8. **Export** — download the polished set as an Excel file.

The interview elicitation flow at `src/app/elicitation/page.tsx` mirrors the review experience for transcript-based uploads.

## Project Structure
```
src/
	app/                  # Next.js routes and layouts
	data/axiosClient.ts   # Axios instance with auth interceptors
	hooks/                # Browser-only hooks (useIsClient, useWindowDimensions)
	services/             # Thin API wrappers
	stores/               # Zustand stores with persistence
	ui/                   # Ant Design-based design system (atoms/molecules/organisms/templates)
docs/                   # Architecture, operations, and onboarding guides
scripts/genAntdCss.tsx  # Prebuild script regenerating Ant Design CSS
```

## State & Data Flow
- `useAuthStore` persists access/refresh tokens under `auth-storage` and feeds axios interceptors.
- `useProjectStore` and `useRequirementsStore` keep project metadata and requirement data cached locally, re-sorting by `created_at` after fetches.
- Requests are executed through `axiosClient`, which retries 401 responses by calling `/refresh` and replaying the original request.
- Components that read stores gate rendering behind `useIsClient()` to avoid SSR/hydration mismatches.

## Tooling and Scripts
- `npm run dev` — starts Next.js with a `predev` hook that regenerates `public/antd.min.css`.
- `npm run build` — runs the `prebuild` hook for production CSS and creates an optimized build.
- `npm run start` — serves the production build.
- `npm run lint` — Next.js ESLint configuration with Prettier compatibility.

## Documentation
- `docs/architecture.md` — deep dive into the React/Next.js structure and data flow.
- `docs/getting-started.md` — step-by-step setup instructions and sample workflow.
- `docs/operations.md` — development scripts, environment configuration, and troubleshooting.
- `CONTRIBUTING.md` — contribution standards and PR expectations.

## Contributing
We welcome issues and pull requests that improve the UI, strengthen state management, or enhance documentation. Please read `CONTRIBUTING.md` before submitting changes.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
