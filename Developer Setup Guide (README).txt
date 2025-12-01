# Developer Setup Guide

Welcome to the Childhood Disability Advocacy Hub (CDAH) project. This guide helps you stand up a complete development environment for the full-stack application, which consists of an Express/MongoDB backend and a Vite/React frontend.

## Project Overview

The repository hosts two actively developed apps:

| Path | Description |
| --- | --- |
| `Backend/` | Node.js (Express) API serving authentication, member enrollment, and Member of Parliament lookup endpoints. |
| `CDNC-frontend/` | Vite + React TypeScript single-page application that consumes the backend APIs and renders the public site. |

## Prerequisites

* **Node.js 18+** (provides native `fetch` support used by the email/analytics utilities). Consider using [nvm](https://github.com/nvm-sh/nvm) to match the project version.
* **npm 9+** (bundled with recent Node releases). Yarn or pnpm are not officially supported.
* **MongoDB 6.x or higher** accessible locally or via a managed service.
* **Git** for cloning the repository.
* Optional services:
  * SMTP account for confirmation emails (SendGrid, Mailgun, etc.).
  * HTTPS endpoint capable of receiving JSON webhooks if you wish to log analytics events.

## Repository Setup

1. **Clone the repository and enter the project root:**
   ```bash
   git clone <your-fork-or-origin>
   cd childhood-disability-advocacy-hub
   ```
2. **Install dependencies for both applications:**
   ```bash
   cd Backend && npm install
   cd ../CDNC-frontend && npm install
   ```

## Backend Configuration (`Backend/`)

### Environment Variables

Create a `.env` file in the `Backend/` directory. The server expects the following variables:

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | ✅ | Connection string for MongoDB used by the Express app. |
| `JWT_SECRET` | ✅ | Secret used to sign JSON Web Tokens during login. `utils/jwt.js` reads this value and defaults to `secretkey` only for development. |
| `PORT` | ⛔️ | Optional override for the HTTP port (defaults to `5001`). |
| `SMTP_HOST`, `SMTP_PORT` | ⚙️ | Required only if you want to send real confirmation emails to new members (`utils/notifications.js`). |
| `SMTP_USER`, `SMTP_PASS` | ⚙️ | SMTP credentials; both must be set together if authentication is required. |
| `SMTP_SECURE`, `SMTP_REQUIRE_TLS`, `SMTP_IGNORE_TLS`, `SMTP_TLS_REJECT_UNAUTHORIZED` | ⚙️ | Optional boolean toggles for TLS behaviour when using custom providers. |
| `EMAIL_FROM`, `EMAIL_FROM_NAME` | ⚙️ | Friendly sender information for outgoing member welcome emails. Falls back to `SMTP_USER` or `no-reply@localhost`. |
| `ANALYTICS_WEBHOOK_URL` | ⚙️ | Optional endpoint that receives JSON payloads whenever a community member enrolls. |

> **Tip:** When SMTP is not configured the code logs a friendly skip message so local development can proceed without errors.

### Running the Backend

1. **Start MongoDB** locally or ensure your cloud instance is reachable.
2. **Launch the API server:**
   ```bash
   cd Backend
   npm run dev
   ```
   This runs `server.js`, connects to Mongo, and listens on `http://localhost:5001` by default.【F:Backend/server.js†L12-L24】
3. **Run automated tests (optional):**
   ```bash
   npm test
   ```
   Jest executes the test suite serially (`--runInBand`).【F:Backend/package.json†L6-L11】

#### Database Collections

The backend expects the following Mongo collections:

* `users` – created automatically when people register through `/api/auth/register` with validation enforced in `controller/auth.controller.js` and `utils/validation.js`.
* `members` – populated via `/api/members` when the “Join Community” form submits.【F:Backend/controller/member.controller.js†L7-L74】
* `MPContacts` and `MPEmail` – used to build the Member of Parliament directory. Seed these collections with your own datasets to enable search results. The merge logic lives in `controller/mp.controller.js`.【F:Backend/controller/mp.controller.js†L1-L60】

### Useful Backend Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Express server for local development. |
| `npm start` | Production start command (same as `npm run dev` but without nodemon). |
| `npm test` | Execute the Jest API tests. |

## Frontend Configuration (`CDNC-frontend/`)

### Environment Variables

Create a `.env.local` (or `.env`) file inside `CDNC-frontend/` and define:

```bash
VITE_API_URL=http://localhost:5001/api
```

If omitted, the app automatically falls back to the same default value used in `src/lib/api.ts` so the local backend is detected automatically.【F:CDNC-frontend/src/lib/api.ts†L1-L21】

### Running the Frontend

1. **Start the development server:**
   ```bash
   cd CDNC-frontend
   npm run dev
   ```
   Vite serves the SPA on `http://localhost:5173` by default.
2. **Check code quality:**
   ```bash
   npm run lint
   ```
3. **Build and preview production assets:**
   ```bash
   npm run build
   npm run preview
   ```
4. **Explore the Cypress end-to-end harness:**
   ```bash
   npm run test:e2e:open
   ```
   Launches Cypress in interactive mode for manual test execution.

### Frontend Project Structure Highlights

* Routing and providers live in `src/App.tsx`, including React Query, router configuration, toasters, and the accessibility wrapper.【F:CDNC-frontend/src/App.tsx†L1-L38】
* API clients (`src/lib/api.ts`, `src/lib/auth.ts`, `src/lib/members.ts`) consolidate axios usage and make swapping environments easier.【F:CDNC-frontend/src/lib/auth.ts†L1-L22】【F:CDNC-frontend/src/lib/members.ts†L1-L17】
* Page components under `src/pages/` (e.g., `SendLetter.tsx`, `JoinCommunity.tsx`) encapsulate user flows while relying on shared UI primitives and hooks.

## Full-Stack Workflow

1. Start MongoDB.
2. Run `npm run dev` in `Backend/`.
3. Run `npm run dev` in `CDNC-frontend/`.
4. Open `http://localhost:5173` and verify the SPA can reach `http://localhost:5001/api` without CORS issues. The backend enables `cors()` globally, so default ports work out of the box.【F:Backend/app.js†L1-L21】
5. Register a user, enroll as a community member, and search for MPs to populate local collections.

## Troubleshooting

| Symptom | Possible Cause | Fix |
| --- | --- | --- |
| `❌ Mongo error` during startup | Incorrect `MONGO_URI` or MongoDB service offline. | Verify the URI, ensure Mongo is running, and that the database allows connections from your IP.【F:Backend/server.js†L15-L27】 |
| Login always fails | Password policy mismatch or missing user records. | Ensure your test account meets validation rules in `utils/validation.js` and that the password stored in Mongo is hashed. |
| Enrollment emails are skipped | SMTP environment variables absent. | Provide SMTP configuration or ignore the informational log—the API still returns `201`.【F:Backend/utils/notifications.js†L32-L122】 |
| MP search returns empty arrays | Collections lack data. | Import representative datasets into `MPContacts` and `MPEmail`. The API merges both collections to surface email addresses.【F:Backend/controller/mp.controller.js†L7-L60】 |
| Frontend cannot reach backend | Wrong `VITE_API_URL` or backend offline. | Confirm both dev servers are running and that `VITE_API_URL` matches the Express base URL.【F:CDNC-frontend/src/lib/api.ts†L1-L21】 |

## Recommended Development Practices

* Commit early and often; the repository does not include Husky hooks so linting/tests are manual.
* Keep secrets out of version control—`.env` files are ignored by default.
* Use feature branches when collaborating and ensure both apps’ dependencies stay in sync after pulling.

Happy building!
