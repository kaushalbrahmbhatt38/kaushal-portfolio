# Salesforce Authentication Setup

This document explains how to set up Salesforce authentication for the portfolio application.

## Environment Configuration

The application uses environment files to store Salesforce authentication credentials. These files are located in:

- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

## Backend Proxy Server

To avoid CORS issues with Salesforce authentication, the application uses a Node.js backend proxy server. This server handles the authentication requests and forwards them to Salesforce.

### Setting up the server

1. Create a `.env` file in the root directory with the following content:

```
# Salesforce OAuth Configuration
SF_CLIENT_ID=YOUR_SALESFORCE_CLIENT_ID
SF_CLIENT_SECRET=YOUR_SALESFORCE_CLIENT_SECRET
SF_AUDIENCE=https://login.salesforce.com

# Server Configuration
PORT=3000
```

2. Replace `YOUR_SALESFORCE_CLIENT_ID` and `YOUR_SALESFORCE_CLIENT_SECRET` with your actual Salesforce Connected App credentials.

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server with both Angular and the backend proxy:

```bash
npm run dev
```

## Salesforce Connected App Setup

To obtain the client ID and client secret, you need to create a Connected App in Salesforce:

1. Log in to your Salesforce org
2. Go to Setup > App Manager > New Connected App
3. Fill in the required fields:
   - Connected App Name: Portfolio App
   - API Name: Portfolio_App
   - Contact Email: your email
4. Enable OAuth Settings
5. Set the callback URL to: `http://localhost:4200/callback`
6. Select OAuth Scopes:
   - Access and manage your data (api)
   - Perform requests on your behalf at any time (refresh_token, offline_access)
7. Save the Connected App
8. After saving, you'll be able to access the Consumer Key (client ID) and Consumer Secret (client secret)

## Security Considerations

- Never commit your `.env` file or environment files with real credentials to version control
- Consider using environment variables in production environments
- Implement proper token storage and refresh mechanisms
- Use HTTPS in production 