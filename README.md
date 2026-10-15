# Project Krita — Internal knowledge portal

Static, responsive internal product and architecture website built from the Krita solution architecture blueprint v0.2. This is a **concept portal**, not the operational Krita platform. All demonstration records are synthetic.

## Run locally (macOS, Windows, Linux)

Install Node.js 22 or newer, then:

```bash
cd docs-site
npm ci
npm run dev
```

Open **http://127.0.0.1:4321/**. To validate a release:

```bash
npm run check
npm run build
npm run preview
```

## GitHub collaboration

Create a **private** GitHub repository and push this folder:

```bash
git init
git add .
git commit -m "Build Krita internal architecture portal"
git branch -M main
git remote add origin git@github.com:YOUR_ORG/project-krita.git
git push -u origin main
```

Invite collaborators through repository Settings → Collaborators. They can clone the repository and run the same commands locally. The GitHub Actions workflow validates type checks and production builds on pushes and PRs.

## Hosting and confidentiality

**Do not publish this confidential blueprint to public GitHub Pages.** A private repository does not imply a private Pages site. GitHub Pages is appropriate only after the site content is approved for public release; then set `BASE_PATH=/YOUR_REPOSITORY_NAME/` for a project subpath build. For private sharing, use an authenticated hosting provider or collaborate through the private repository and local preview.

## Source and content

- `ARCHITECTURE_BLUEPRINT.md` — original authoritative specification.
- `docs-site/src/pages/` — site routes and narrative content.
- `docs-site/src/components/` — interactive browser-only synthetic demos.
- `docs-site/public/diagrams/` — twelve architecture diagrams extracted from the supplied Word blueprint.
- `docs-site/src/styles/global.css` — design tokens and responsive styles.

## Scope and limitations

No backend, live database, LLM endpoint, user authentication, real ingestion, patient records, banking integrations, production tenancy, or persistent approval actions. Mapping JSON exports run locally in the browser. Diagram assets describe proposed architecture. Portal build success is not evidence of platform implementation. The original Markdown references separate `.dot` diagram sources that were not attached; this project preserves the embedded diagrams as PNGs from the Word file, not editable Graphviz originals.

## Redesigned product-first portal

The landing page now introduces the business problem, explains Krita in plain language, and offers an interactive five-step walkthrough (Connect → Understand → Connect the dots → Investigate → Act). Product cards lead into Core, Pulse and Ledger; detailed architecture remains accessible from the top navigation.

### Runtime

Use **Node.js 22.19 or newer** (or a supported newer LTS version). From `docs-site/`, run `npm ci` and `npm run dev`. The source archive intentionally excludes `.node-env`, `node_modules`, and generated build files. The npm dependency installation and production build were not successfully completed in the authoring environment; run `npm run build` locally to validate before deployment.

## Link for the site
`https://shashank-kvs.github.io/project-krita/`
