# Deployment Guide for TTC Server

This guide provides step-by-step instructions for deploying the TTC server with a connection to your Neon PostgreSQL database.

## Prerequisites

- Node.js 16+ and npm installed
- Git repository for your code
- Neon PostgreSQL database (already set up with connection string)

## Database Connection

The server is configured to connect to your Neon PostgreSQL database using the following connection string:

```
postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require
```

This connection string is used via the `DATABASE_URL` environment variable in your deployment environment.

## Deployment Options

### Option 1: Deploy using our Script

We've created a deployment script that simplifies the process for various platforms:

```bash
# Make the script executable if it isn't already
chmod +x deploy.sh

# Show available deployment options
./deploy.sh help

# Deploy to a specific platform (e.g., Railway)
./deploy.sh railway
```

### Option 2: Deploy with Docker

1. Build the Docker image:
   ```bash
   docker build -t ttc-server .
   ```

2. Run the container:
   ```bash
   docker run -p 5000:5000 \
     -e DATABASE_URL="postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require" \
     -e NODE_ENV=production \
     ttc-server
   ```

3. Alternatively, use Docker Compose:
   ```bash
   docker-compose up
   ```

### Option 3: Deploy to Render (Recommended)

1. Sign up for a [Render](https://render.com) account
2. Connect your GitHub repository
3. Create a new Web Service
4. Use the following settings:
   - Build Command: `cd packages/server && npm install && npm run build`
   - Start Command: `cd packages/server && npm start`
   - Add the environment variable:
     - Key: `DATABASE_URL`
     - Value: `postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require`

### Option 4: Deploy to Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Navigate to your server directory: `cd packages/server`
4. Initialize a new project: `railway init`
5. Set your database URL: `railway variables set DATABASE_URL=postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require`
6. Deploy: `railway up`

### Option 5: Deploy to Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Navigate to your server directory: `cd packages/server`
4. Launch a new app: `fly launch`
5. Set your database URL: `fly secrets set DATABASE_URL="postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require"`
6. Deploy: `fly deploy`

## Verifying Your Deployment

After deploying, verify your server is working correctly by:

1. Checking the deployment logs for successful database connection
2. Accessing the health check endpoint: `https://your-deployed-app.com/api/health`
3. Testing the users API endpoint: `https://your-deployed-app.com/api/users`

## Troubleshooting

If you encounter issues with your deployment:

1. Check that the `DATABASE_URL` environment variable is correctly set
2. Verify that your Neon PostgreSQL database is accessible from your deployment platform
3. Check the deployment logs for any connection errors
4. Ensure your database has the required tables and data (the server should create these automatically)

## Security Considerations

- Your database connection string contains sensitive credentials. Always use environment variables and never commit them to your repository.
- Consider setting up IP restrictions on your Neon database if your deployment platform supports static IP addresses.
- Implement proper authentication for your API endpoints in production.
