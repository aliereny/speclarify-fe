# Contributing to Speclarify Frontend

Thanks for your interest in improving Speclarify! This guide explains how to propose changes to the frontend. The backend/API lives in a separate repository, so contributions here should focus on the Next.js application.

## Code of Conduct
Be respectful, constructive, and inclusive. Treat GitHub discussions and PR reviews as collaborative problem-solving sessions.

## Getting Ready
1. Fork the repository and clone your fork.
2. Install dependencies with `npm install`.
3. Create `.env.local` supplying at least `NEXT_PUBLIC_API_URL` (see `docs/getting-started.md`).
4. Run `npm run dev` to verify the UI launches and can talk to your API instance.

## Branching & Commit Style
- Use feature branches: `git checkout -b feature/descriptive-name`.
- Keep commits focused. Reference GitHub issues where possible (`fix:`, `feat:`, `docs:` prefixes are welcome but not enforced).

## Development Checklist
- Update documentation when behavior or configuration changes (`README.md`, `docs/*`).
- Prefer existing design-system components (`src/ui/atoms|molecules|organisms`).
- Interact with the backend via store actions or services that leverage `axiosClient` so token refresh works automatically.
- Guard browser-only logic behind `useIsClient()` to prevent hydration warnings.

## Quality Gates
- `npm run lint` must pass before opening a pull request.
- Tests are not configured yet. If your change introduces automated tests, include the necessary runner (Jest, Vitest, etc.) and document new commands in `docs/operations.md`.
- Consider adding manual testing notes in your PR description (e.g., steps taken to verify the requirement workflow still functions).

## Submitting a Pull Request
1. Rebase on `main` to avoid merge conflicts.
2. Push your branch and open a PR targeting `main`.
3. Fill in the PR template (or describe):
   - Purpose of the change.
   - Screenshots/GIFs for UI updates.
   - Testing performed (`npm run lint`, manual steps, any automated tests).
4. Respond to reviewer feedback promptly and keep discussions friendly.

## Reporting Issues
- Use GitHub Issues for bugs or feature requests. Include reproduction steps, expected vs. actual behavior, and browser/environment details.
- Tag documentation gaps as `documentation` so we can refine onboarding materials.

We appreciate every contribution, from typo fixes to new workflow steps. Welcome aboard!
