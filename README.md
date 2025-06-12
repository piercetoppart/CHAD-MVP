# CHAD-MVP

Psychology-first freelance Operating System.  
Built with **React 18 + TypeScript (frontend)**, **Node.js API (backend)**, **PostgreSQL/Timescale + Redis (data)**, and **TensorFlow.js** for live sentiment & confidence modelling.

## Monorepo structure

- /frontend – React UI, component library, state machines
- /backend – Express/Nest API, WebSocket gateways, Codex hooks
- /ml – TensorFlow.js models & training notebooks
- /database – SQL migrations & seeders
- /docs – Wireframes, pitch deck, implementation guides
- /scripts – Local dev / deployment helpers

git clone https://github.com/piercetoppart/CHAD-MVP.git
cd CHAD-MVP
./scripts/dev.sh # spins up Postgres, Redis, frontend & backend

### Linting

Run ESLint with Prettier formatting checks:

```bash
yarn lint
```

Roadmap (short-cycle)
MorningDashboard – calm “While You Slept” view

ConfidenceBoostSystem – afternoon doubt spiral interventions

SmartStopSystem – analysis-paralysis breaker
(Full roadmap lives in /docs/technical_implementation_roadmap.html)

Licence
MIT – see LICENSE file.
