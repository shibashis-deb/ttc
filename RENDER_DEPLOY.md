# Deploying TTC App to Render.com

This guide explains how to deploy the TTC application to Render.com.

## Deployment Steps

### 1. Create a New Web Service on Render.com

1. Sign in to your Render.com account
2. Click on "New +" and select "Web Service"
3. Connect your GitHub repository or use the public repository URL

### 2. Configure the Web Service

Use the following settings:

- **Name**: ttc-app (or your preferred name)
- **Environment**: Node
- **Region**: Choose the region closest to your users
- **Branch**: main (or your default branch)
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `cd packages/server && node dist/index.js`
- **Build Path**: Leave empty (we're using the root directory)

### 3. Configure Environment Variables

Add the following environment variables:

- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will automatically set the correct port)
- `DATABASE_URL`: `postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require`

### 4. Deploy

Click "Create Web Service" and Render will automatically build and deploy your application.

## Troubleshooting

If you encounter any issues:

1. Check the build logs for errors
2. Verify that all environment variables are set correctly
3. Ensure the database is accessible from Render.com

## Monitoring

Once deployed, you can monitor your application's performance and logs from the Render dashboard.
