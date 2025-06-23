# TTC Server

Express server with PostgreSQL database connection.

## Features

- Express.js REST API
- PostgreSQL database connection (using Neon serverless Postgres)
- User authentication endpoints
- Environment-based configuration
- TypeScript support

## Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm
- PostgreSQL database (or connection to Neon PostgreSQL)

### Installation

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your database credentials
# The default configuration uses the Neon PostgreSQL connection
```

### Development

```bash
# Run in development mode with hot reload
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

### Health Check

- `GET /api/health` - Check database connection status

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

## Deployment

This server can be deployed to various platforms:

### Render

1. Connect your GitHub repository
2. Create a new Web Service
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables from your `.env` file

### Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Link project: `railway link`
4. Deploy: `railway up`

### Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Create a new app: `fly launch`
4. Set secrets: `fly secrets set DATABASE_URL="your-connection-url"`
5. Deploy: `fly deploy`

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development, production)
- `DATABASE_URL` - PostgreSQL connection URL
