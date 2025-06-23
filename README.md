# TTC Fullstack Project

A minimal fullstack application using Node.js with pnpm workspace.

## Tech Stack

### Client
- React v18
- Vite

### Server
- Express.js
- PostgreSQL
- JWT for authentication

## Project Structure

```
ttc/
├── packages/
│   ├── client/          # React frontend
│   └── server/          # Express backend
└── pnpm-workspace.yaml  # Workspace configuration
```

## Getting Started

### Installation

```bash
# Install dependencies for all packages
pnpm install
```

### Development

```bash
# Run both client and server in development mode
pnpm dev

# Run only client
pnpm --filter client dev

# Run only server
pnpm --filter server dev
```

### Production

```bash
# Build all packages
pnpm build

# Start the server in production mode
pnpm start
```
