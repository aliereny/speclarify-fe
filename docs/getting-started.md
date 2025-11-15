# Getting Started

This guide walks through setting up the Speclarify frontend locally and exercising the core requirements workflow against a running API.

## 1. Prerequisites
- Node.js 18+ (Next.js 13 requires an active LTS release).
- npm (bundled with Node) or another compatible package manager.
- Access to a Speclarify-compatible backend exposing the REST endpoints used by the stores (`/login`, `/refresh`, `/projects`, `/projects/:id/requirements`, etc.).
- Optional: modern browser with localStorage enabled (stores persist state between reloads).

## 2. Clone and Install
```bash
git clone https://github.com/aliereny/speclarify-fe.git
cd speclarify-fe
npm install
```

## 3. Configure Environment Variables
Create `/.env.local` at the repository root:
```bash
NEXT_PUBLIC_API_URL=https://your-api.example.com/api/v1
API_URL=https://your-api.example.com/api/v1
```

- `NEXT_PUBLIC_API_URL` is required for axios requests in the browser. When omitted, the app falls back to `https://api.speclarify.com/api/v1`.
- `API_URL` is optional and only impacts the export step, which constructs download links on the server.

## 4. Run the App
```bash
npm run dev
```

The `predev` hook regenerates `public/antd.min.css` before Next.js starts. Visit `http://localhost:3000` to see the dashboard.

## 5. Walk Through the Workflow
1. Click **Add Project**, supply a name/description, and return to the dashboard.
2. Enter the project to open the stepper and start with **Upload**.
3. Upload an SRS PDF; the app posts `FormData` to `/projects/:id/parse-pdf`.
4. Proceed to **Review** to edit, delete, or add requirements (five per page).
5. Continue through **Remove Duplicates**, **Remove Inconsistencies**, and **Fix Ambiguities**, using the provided cards to act on AI findings.
6. In **Prioritize**, assign High/Medium/Low. In **Classify**, choose class/subclass pairs.
7. Finish on **Export** and download the generated spreadsheet. Ensure the backend's export endpoint is reachable.
8. Optionally explore **Elicitation** (header navigation) to upload interview transcripts and review extracted requirements outside the project context.

## 6. Linting and Production Builds
- `npm run lint` — repeat before committing or opening a PR. The config extends `eslint-config-next` with Prettier compatibility.
- `npm run build` — runs the Ant Design CSS generator and creates an optimized production build.
- `npm run start` — serves the build on `http://localhost:3000` by default.

## 7. Troubleshooting
- **401 errors after login** — confirm the backend refresh endpoint is available; the axios interceptor retries once with `/refresh`.
- **Stale requirements list** — store actions refetch after writes, but state is persisted. Use your browser devtools to clear localStorage keys `auth-storage`, `projects`, and `requirements` to reset.
- **Ant Design styles missing** — ensure `npm run dev` or `npm run build` executed the `pre*` scripts; deleting `public/antd.min.css` and restarting the command will regenerate it.

You are now ready to build and iterate on the Speclarify frontend.
