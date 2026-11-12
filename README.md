# Dr. Fahmida Bristy — Portfolio

```
fahmida-portfolio/
├── client/   Vite + React frontend (http://localhost:5173)
└── server/   Express + MongoDB API   (http://localhost:5000)
```

## Run locally

```bash
npm run install:all        # installs client/ and server/ dependencies
```

Then in two terminals:

```bash
npm run dev:server         # API on :5000  (needs server/.env, see server/.env.example)
npm run dev:client         # site on :5173 (proxies /api to :5000)
```

Or run each one yourself with `cd client && npm install && npm run dev`
and `cd server && npm install && npm run dev`.

See `client/README.md`, `client/INSTALLATION.md` and `server/README.md` for details.
